# use-pluggy-connect

> React hook to integrate Pluggy Connect.

[![NPM](https://img.shields.io/npm/v/use-pluggy-connect.svg)](https://www.npmjs.com/package/use-pluggy-connect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-pluggy-connect
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-pluggy-connect'

const Example = () => {
  const handleEvent = useCallback((event) => {
    console.log(`[Event]: ${event}`);
  }, [])

  const { init, error, ready } = usePluggyConnect({ url: "https://connect.pluggy.ai", connectToken: 'eyJhbGciOiJSUzI1NiIsIn...', onEvent: handleEvent })

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
```
