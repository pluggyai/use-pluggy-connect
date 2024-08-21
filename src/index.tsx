import { useEffect, useState, useCallback, useRef } from 'react'
import type {
  PluggyConnectProps as PluggyConnectProps_,
  PluggyConnect as PluggyConnectBaseType,
} from 'pluggy-connect-sdk'

export type PluggyConnectProps = PluggyConnectProps_

const noop = () => {}

export const usePluggyConnect = (options: PluggyConnectProps) => {
  const [error, setError] = useState<Error | null>(null)
  const [pluggyConnect, setPluggyConnect] =
    useState<PluggyConnectBaseType | null>(null)

  const pluggyConnectBase = useRef<typeof PluggyConnectBaseType | null>(null)

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined'

    if (!isBrowser) return // Exit the effect if not in the browser

    async function loadPluggyConnect() {
      if (!options.connectToken) {
        throw new Error(
          'use-pluggy-connect: You need a valid connectToken for usePluggyConnect.'
        )
      }

      const { PluggyConnect } = await import('pluggy-connect-sdk')

      pluggyConnectBase.current = PluggyConnect

      const pluggyConnect_ = new PluggyConnect(options)
      setPluggyConnect(pluggyConnect_)
    }

    loadPluggyConnect()
  }, [options.connectToken])

  const init = useCallback(() => {
    if (!pluggyConnect) {
      throw new Error(
        "use-pluggy-connect: PluggyConnect instance isn't ready yet."
      )
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