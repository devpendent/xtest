import { useMachine } from '@xstate/react'
import React from 'react'
import logo from './logo.svg'
import './App.css'
import { counterMachine } from './counter'

function App() {
  const [current, send] = useMachine(counterMachine)

  const handleClick = type => e => {
    e.preventDefault()
    send(type)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="/" onClick={handleClick('INC')}>
          <span role="img" aria-label="increment">
            +
          </span>
        </a>
        Count: {current.context.count}
        <a className="App-link" href="/" onClick={handleClick('DEC')}>
          <span role="img" aria-label="decrement">
            -
          </span>
        </a>
      </header>
    </div>
  )
}

export default App
