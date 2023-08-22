import { useEffect, useState, useCallback } from 'react'
import {
  PluggyConnectProps as PluggyConnectProps_,
  PluggyConnect as PluggyConnectBase,
} from 'pluggy-connect-sdk'

export type PluggyConnectProps = PluggyConnectProps_

const noop = () => {}

export const usePluggyConnect = (options: PluggyConnectProps) => {
  const [error, setError] = useState<Error | null>(null)
  const [pluggyConnect, setPluggyConnect] = useState<PluggyConnectBase | null>(
    null
  )

  useEffect(() => {
    if (!options.connectToken) {
      throw new Error(
        'use-pluggy-connect: You need a valid connectToken for usePluggyConnect.'
      )
      return
    }

    const pluggyConnect_ = new PluggyConnectBase(options)
    setPluggyConnect(pluggyConnect_)
  }, [options.connectToken])

  const init = useCallback(() => {
    if (!pluggyConnect) {
      throw new Error(
        "use-pluggy-connect: PluggyConnect instance isn't ready yet."
      )
      return
    }

    try {
      const containerElement =
        document.body ||
        document.documentElement ||
        document.getElementsByTagName('div')[0]
      pluggyConnect.init(containerElement)
    } catch (e) {
      if (e instanceof Error) {
        console.error('Failed to initialize PluggyConnect', e)
        setError(e)
      }
    }
  }, [pluggyConnect])

  return {
    init,
    error,
    ready: Boolean(pluggyConnect),
    show: pluggyConnect ? pluggyConnect.show : noop,
    hide: pluggyConnect ? pluggyConnect.hide : noop,
  }
}
