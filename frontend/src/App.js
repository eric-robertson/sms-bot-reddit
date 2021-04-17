import './App.css'
import { useState } from 'react'
import Lookup from './Lookup'
import AddPhone from './AddPhone'

const App = () => {
  const [lookupTab, setLookupTab] = useState(false)

  return (
    <div className="App">
        <div className="switcher">
            <button onClick={() => setLookupTab(true)}>
                Edit Rules
            </button>
            <button onClick={() => setLookupTab(false)}>
                Add Rules
            </button>

        </div>

        <img src="logo.svg" />

      {lookupTab
        ? <Lookup />
        : <AddPhone />
      }
    </div>
  )
}

export default App
