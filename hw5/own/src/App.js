import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [connect, setConnect] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const response = await startGame()
          if (response === "Server not responding or not connected") {
            setConnect(response)
          } else {
            setConnect('')
            setHasStarted(true)
          }
        }}
      >
        start game
      </button>
      <p>{connect}</p>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const response = await restart()
          if (response === "Server not responding or not connected") {
            setConnect(response)
          } else {
            setConnect('')
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
        }}
      >
        restart
      </button>
      <p>{connect}</p>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    // console.log("fuck")
    const response = await guess(number)
    // const response = await axios.get('/guess');
    // console.log(response)
    if (response === "Server not responding or not connected") {
      setConnect(response)
    } else {
      setConnect('')
      setStatus(response)
    }
    if (response === 'Equal') {
      setHasWon(true)
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
      <p>{connect}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
