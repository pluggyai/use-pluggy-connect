import React, { useCallback } from 'react'

import { usePluggyConnect } from 'use-pluggy-connect'

const App = () => {
  const handleEvent = useCallback((payload) => {
    console.log(`[Event]: ${payload}`)
  }, [])

  const { init, error, ready } = usePluggyConnect({
    connectToken: 'your-connect-token',
    onEvent: handleEvent,
  })

  if (!ready) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <button onClick={init}>Init</button>
    </div>
  )
}
export default App
