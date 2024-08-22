import type { PluggyConnectProps as PluggyConnectProps_ } from 'pluggy-connect-sdk';
export type PluggyConnectProps = PluggyConnectProps_;
declare const usePluggyConnect: (options: PluggyConnectProps) => {
    init: () => void;
    error: Error | null;
    ready: boolean;
    show: () => void;
    hide: () => void;
};
export default usePluggyConnect;
