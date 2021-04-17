import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import Lookup from './Lookup'
import AddPhone from './AddPhone'

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

      {lookupTab
        ? <Lookup />
        : <AddPhone />
      }
    </div>
  )
}

export default App
