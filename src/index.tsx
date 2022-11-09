import { useEffect, useState } from "react";

import {
  PluggyConnectProps as PluggyConnectProps_,
  PluggyConnect as PluggyConnectBase,
} from "pluggy-connect-sdk";
import useScript from "react-script-hook";

/*! re-export types to keep same interface */
export type PluggyConnectProps = PluggyConnectProps_;

const PLUGGY_CONNECT_URL =
  "https://cdn.pluggy.ai/pluggy-connect/v1.3.1/pluggy-connect.js";

const noop = () => {};

export const usePluggyConnect = (options: PluggyConnectProps) => {
  const { connectToken, allowConnectInBackground, includeSandbox, url, env } =
    options;

  // checking if window is defined to make it work in SSR
  if (typeof window === "undefined") {
    // no window, just return
    return;
  }
  // Asynchronously load the PluggyConnect url into the DOM
  const [loading, error] = useScript({
    src: PLUGGY_CONNECT_URL,
    checkForExisting: true,
  });

  // internal state to check if pluggy connect is loaded
  const [pluggyConnect, setPluggyConnect] = useState<
    PluggyConnectBase | undefined
  >();

  useEffect(() => {
    if (loading) {
      // script loading -> just return
      return;
    }
    if (error) {
      throw new Error("Fail to load PluggyConnect into the DOM");
    }
    if (pluggyConnect) {
      // connect already loaded, destroy it
      pluggyConnect.destroy();
    }
    const pluggy = new PluggyConnectBase(options);

    setPluggyConnect(pluggy);
  }, [
    loading,
    error,
    connectToken,
    allowConnectInBackground,
    includeSandbox,
    url,
    env,
  ]);

  const initNoOp = () => {
    if (!options.connectToken) {
      console.warn(
        "use-pluggy-connect: You cannot call init() without a valid connectToken supplied to usePluggyConnect. This is a no-op."
      );
    }
  };

  const ready = pluggyConnect && !loading;

  return {
    ready,
    error,
    init: pluggyConnect ? pluggyConnect.init : initNoOp,
    show: pluggyConnect ? pluggyConnect.show : noop,
  };
};
