import axios from "axios";
import { useState } from "react";
import "./App.css";
import { guess, startGame, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          const msg = await startGame();
          if (msg === "The game has started.") {
            setHasStarted(true);
          } else {
            alert(msg);
          }
        }}
      >
        start game
      </button>
    </div>
  );

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const msg = await restart();
          if (msg === "The game has re-started.") {
            setHasWon(false);
            setStatus("");
            setNumber("");
          } else {
            alert(msg);
          }
        }}
      >
        restart
      </button>
    </>
  );

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    const msg = await guess(number);
    if (msg === "Equal") {
      setHasWon(true);
    } else if (msg === "Error: server not responding or not connected") {
      alert(msg);
    } else {
      setStatus(msg);
    }
  };

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={number} onChange={(e) => setNumber(e.target.value)}></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p>{status}</p>
    </>
  );

  const game = <div>{hasWon ? winningMode : gameMode}</div>;

  return <div className="App">{hasStarted ? game : startMenu}</div>;
}

export default App;
