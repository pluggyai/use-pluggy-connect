import React, { useCallback } from 'react'

import { usePluggyConnect } from 'use-pluggy-connect'

const App = () => {
  const handleEvent = useCallback((payload) => {
    console.log(`[Event]: ${payload}`)
  }, [])

  const { init, error, ready } = usePluggyConnect({
    url: 'https://connect.pluggy.dev',
    connectToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImNlYWM3MjAyLWQ3NGItNGQzNS1iMDFlLTYxZWM0ZDQ3M2IyZCIsImRhdGEiOiIzZTY5ZjI3NTk0ODAyYWQ1YTk4ZDMyN2QwZGFhOWU1Mjo4NzRiZTIwYjFmZmZjZWE1OWY5Y2NkMzhhNDU2ZDg1NTM2MzkzZDRmYzM0MTYzN2MwZmZhN2RiYzVhNDA0OTAwZGIwOWE5ODdjNjNhMjQ4MTY4YjJiZmVlNDNiNGU0MjQ2YmI3MDE2Y2MzZmFhMTBiM2Q5MDAxNGNhNTM0OWVmOWI4OGI2ODI2YzhiMzFjOTliNjBlODRlMDk2MGFlMThjZDc0MmNjMGIxNDczNjU4MzgzYWQ1MjBjNzIyNjM5ZmJiMDc5ZDg5NmFmNjQwZmQ2ZTE4NzNkYzczYjI1MmQ2ZWNmNzcwMzYxOTYxYzllNTkzMTA1NjdiNDJjODc5NmJmIiwiaWF0IjoxNjkxNTg2MzM1LCJleHAiOjE2OTE1ODgxMzV9.CJdWCBcDaRfF0pe3TpZPszUXhAwuhEVaMXYDFqn2e0W8MTkqLAwwLqnCrNlMgEzWred-qn6IybJ6u5E6IkUxEszyC2wORHGc35ROj9YBGHbp-QEnAs1dfWtW3DiYzNd6SOpKUv8XON33ymmIL-65pHCOo_LSY8NOpI7WErOwkXWEEW0_goJxgCx3wo8wqEk-lA4GALBLMg-SpnjEbHZGDcDG3iL3J_5hekF2qzG2CTIhKE-2ksvfon_iimk8LQlAR8iiTh63Peca1yjgVOueT231zETgtNIvm92MALJueEhC7LmL-2NihHQerep_vYpW1GsPA2E1lnX6G_IYx_PZDQ',
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
