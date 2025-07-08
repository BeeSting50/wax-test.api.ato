import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testWaxAPI = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://test.wax.api.atomicassets.io/atomicassets/v1/collections?authorized_account=superkstudio&limit=11&page=1')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setApiResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={testWaxAPI} disabled={loading} style={{marginLeft: '10px'}}>
          {loading ? 'Testing...' : 'Test WAX API'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {error && (
        <div style={{color: 'red', margin: '20px 0'}}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
      {apiResponse && (
        <div style={{margin: '20px 0', textAlign: 'left'}}>
          <h3>API Response:</h3>
          <pre style={{background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto'}}>
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
