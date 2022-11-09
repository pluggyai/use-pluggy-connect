import React, { useCallback } from 'react'

import { usePluggyConnect } from 'use-pluggy-connect'

const App = () => {
  const handleEvent = useCallback((event) => {
    console.log(`[Event]: ${event}`);
  }, [])

  const { init, error, ready } = usePluggyConnect({ url: "https://connect.pluggy.ai", connectToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImU4ODk1MzgzLWM4ZTAtNDU0Ny1hNWE3LTQ2YjYzNjA5MWE5ZSIsImRhdGEiOiI0NGU3ODYzYzdhNWVmMDFkNTI2MGU5MzIxZWNiYTY4MDo3OWJmNWE2ZjFkYzA3NmVjY2Q2YjNlNDJmMjU2ZDYwNGUwMGU3ZjYzMzlkY2JiMWM0YzZhMjFmYTU2OGJhYjljYTA4ODllZmFkZTFjNmJjMGI4MzlkNjM1ODJlM2Y2MzNmNDQzMzE0MWVlZjRjZGM3MjgyNDdjMjhhNTRjMDBkZGVjNTM2N2QwMGEyNTFmNzU5Y2UyY2E2MzY2MzE5ZjcyYjdjOTMwNWU1ZThjODgyMzY4NTgyZGQ2MjQ4OWRhMTM2MGNmOGEyMjlkN2IxNjEyOGUyZmRjMmQ1YTJlNTJhMzc3ZjUxYzVkMTNjYTllZjNiNjRhNTdjMmIxY2Y2NTc3IiwiaWF0IjoxNjYzMTkzNjkzLCJleHAiOjE2NjMxOTU0OTN9.ii-Z5E3PCncG-_zGNNPEfgy4TFfecOmcisMz41cOLtABUwvl1g_UoOsSacj0S3XDCWL00jmPQbwTkJIQx_cLT9iZCeXm3e1x4bWDjS7OckClF4EY2iiX9bTHAiEXfHpPkUlnaj-7IwN3nbP7j-cl-i4zbebdxO6nbLdsnJ0tF_oyx9jNC_7uRjaZNCziHzUWnjh8ffKh-afNePeWNv7Q1PEQRmgOMyqhjXxjRKnz1YweD-cpW-8n5u6xxnJOxCVUTKVwNkLSWUKsg1TdFQ3UtsyY_jbczKWPYM2aQzNo_7Wy5zJORgOlYDbqgK6V8VMGA7bEKm95vVLuilkguiwezQ', onEvent: handleEvent })

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
