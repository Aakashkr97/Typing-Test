import React, {useState} from 'react'
import './App.css'
import useWordGame from "./useWordGame"

function App() {
  const [time, setTime] = useState(60)
  const {errors, display, inputRef, handleText, text, countDown, timeRemaining, startGame, wordCount} = useWordGame(time)

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        value={display}
        disabled={true}
      />
      <textarea
        ref = {inputRef}
        onChange={handleText}
        value={text}
        disabled={!countDown}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={countDown}>Start</button>
      <div className="buttons">
        <button onClick={() => setTime(30)} disabled={countDown}>30</button>
        <button onClick={() => setTime(60)} disabled={countDown}>60</button>
      </div>
      <h4>Word Count: {wordCount}</h4>
      <h4>Average: {(wordCount/time)*60} wpm</h4>
      <h4>Errors: {errors/2}</h4>
    </div>
  );
}

export default App;

