import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { usePluggyConnect } from 'use-pluggy-connect'

function App() {
  const [count, setCount] = useState(0)

  const { ready, init } = usePluggyConnect({
    connectToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjBhZDdiMDNiLTUwZWQtNDc1OC04ODhkLTU2MGU1ZDVhYzBkYiIsImRhdGEiOiIyNmE3NmVhMWY2MDgzMzE3ZWVkZWFjNTNlYTFhODk0YTpiYzQwMzA4YzQxNjRiZGY2MzkyNjQ5YzkwOWYwODc0ZGQ4OWZmYmQ2ZDM0YzY3YjJiNzU1YmY2NTUyNWM0NWVkMTZjZGQ2OGJjNGVlMzhhZWIzMDMxZWI2NjI4NzdhYTMyZDkxYzIyNWM3NWY3OTA5OTE4ZDY0MzUzM2Y2YTJiMzZiMDc3MjJhOGVhYWJkZDdiMGY1ZmI4ZWE2NzA4ZWE4N2VmNDIwYTU2MWM3YzRlMGIyZjRhNjYxZjUxOGExODUxNGY3NTY1YTIzN2UzYzYwYTkzMjEwZTdiMzU0YmQ2ZjdmZWNhM2I0Njg2NDA4NTBiMzNlNjllOTBjYWVhMDk1IiwiaWF0IjoxNzI0MjY3MTU5LCJleHAiOjE3MjQyNjg5NTl9.RMEjMH8vQPnwALJuyFeNwff1_uCbpiim10gDjD1GaXGrEDi7N5yOl4pQQkalXEwI20y_O2PB4zYa1rSnuR9VcOPJlOaJWK2hmFEri0PjE4LA8mn9AFwKK2_kdtJOQdHnHbXOAdS-h-37W7a6m7hW-X07_fbJ_BOqA5va2SmRAZ_ed2XxdbUCy5jofeif5ledZ9-qUKmi6HRWi40ITMI_1l23PO8bauA-mHXPFIbdWS14ePwVlFDRdja_Dhfgaz46LHPHxV1YUxH5LyCbrzhzq2BK5J6Z9oc8ol291gHB4CQIgimNWjbSmrzH0-2Qk5froX_rJRnzXreAlDD5buESdQ',
  })

  if (!ready) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={init}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
