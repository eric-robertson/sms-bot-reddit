import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

const App = () => {
  const [lookupTab, setLookupTab] = useState(true)

  return (
    <div className="App">
      <button onClick={() => setLookupTab(true)}>
        Lookup Phone Rules
      </button>
      <button onClick={() => setLookupTab(false)}>
        Add Phone Rules
      </button>
    </div>
  )
}

export default App
