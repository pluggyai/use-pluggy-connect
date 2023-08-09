import { usePluggyConnect } from './'
import { renderHook, act } from '@testing-library/react-hooks'
import { PluggyConnect as PluggyConnectBase } from 'pluggy-connect-sdk'

jest.mock('pluggy-connect-sdk')

type MockedPluggyConnectBase = jest.Mock

// Mock timer using jest
jest.useFakeTimers()

describe('usePluggyConnect', () => {
  beforeEach(() => {
    // Clear all instances and calls to the constructor and all methods:
    ;(PluggyConnectBase as MockedPluggyConnectBase).mockClear()
  })

  it('should warn if no connectToken is provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn')
    renderHook(() => usePluggyConnect({} as any))

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'use-pluggy-connect: You need a valid connectToken for usePluggyConnect.'
    )
  })

  it('should instantiate PluggyConnectBase with provided options', () => {
    renderHook(() => usePluggyConnect({ connectToken: 'mock-connect-token' }))

    expect(PluggyConnectBase).toHaveBeenCalledWith({
      connectToken: 'mock-connect-token',
    })
  })

  it('should be ready once PluggyConnectBase is instantiated', () => {
    const { result } = renderHook(() =>
      usePluggyConnect({ connectToken: 'mock-connect-token' })
    )
    expect(result.current.ready).toBe(true)
  })

  it('should warn if trying to init before PluggyConnectBase is ready', () => {
    const { result } = renderHook(() => usePluggyConnect({} as any))
    const consoleWarnSpy = jest.spyOn(console, 'warn')

    act(() => {
      result.current.init()
    })

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "use-pluggy-connect: PluggyConnect instance isn't ready yet."
    )
  })

  it('should handle init errors', () => {
    ;(PluggyConnectBase as MockedPluggyConnectBase).mockImplementation(() => {
      return {
        init: () => {
          throw new Error('Mock initialization error')
        },
      }
    })

    const { result } = renderHook(() =>
      usePluggyConnect({ connectToken: 'mock-connect-token' })
    )

    act(() => {
      result.current.init()
    })

    expect(result.current.error).toEqual(new Error('Mock initialization error'))
  })

  it('should expose show function after PluggyConnectBase is instantiated', () => {
    const mockShowFunction = jest.fn()

    ;(PluggyConnectBase as MockedPluggyConnectBase).mockImplementation(() => {
      return {
        init: jest.fn(),
        show: mockShowFunction,
      }
    })

    const { result } = renderHook(() =>
      usePluggyConnect({ connectToken: 'mock-connect-token' })
    )

    act(() => {
      result.current.show()
    })

    expect(mockShowFunction).toHaveBeenCalled()
  })
})
