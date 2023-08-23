import { usePluggyConnect } from './'
import { renderHook, act } from '@testing-library/react-hooks'
import { PluggyConnect as PluggyConnectBase } from 'pluggy-connect-sdk'

jest.mock('pluggy-connect-sdk')

type MockedPluggyConnectBaseInstance = {
  init: jest.Mock
  error: Error | null
  ready: boolean
  show: jest.Mock
  hide: jest.Mock
}

type MockedPluggyConnectBase = jest.Mock<MockedPluggyConnectBaseInstance>

// Mock timer using jest
jest.useFakeTimers()

describe('usePluggyConnect', () => {
  beforeEach(() => {
    // Clear all instances and calls to the constructor and all methods:
    ;(PluggyConnectBase as jest.Mock).mockClear()
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

  it('should handle init errors', () => {
    ;(PluggyConnectBase as jest.Mock).mockImplementation(() => {
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

    ;(
      PluggyConnectBase as unknown as MockedPluggyConnectBase
    ).mockImplementationOnce(() => {
      return {
        init: jest.fn(),
        show: mockShowFunction,
        error: null,
        ready: true,
        hide: jest.fn(),
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
