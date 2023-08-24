# use-pluggy-connect

> React hook to integrate Pluggy Connect.

[![NPM](https://img.shields.io/npm/v/use-pluggy-connect.svg)](https://www.npmjs.com/package/use-pluggy-connect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-pluggy-connect
```

## Usage

```tsx
import React, { useCallback } from 'react'

import { usePluggyConnect } from 'use-pluggy-connect'

const App = () => {
  const handleEvent = useCallback((payload) => {
    console.log(`[Event]: ${payload}`)
  }, [])

  const { init, error, ready } = usePluggyConnect({
    url: 'https://connect.pluggy.dev',
    connectToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IJ9...',
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
```