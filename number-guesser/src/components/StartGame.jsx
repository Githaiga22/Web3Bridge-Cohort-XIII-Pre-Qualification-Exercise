import { useState } from 'react'

function StartGame({ onStart }) {
  const [playerName, setPlayerName] = useState('')
  const [difficulty, setDifficulty] = useState('easy')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!playerName.trim()) {
      alert('Please enter your name to start the game.')
      return
    }
    onStart(playerName.trim(), difficulty)
  }

  return (
    <div id="startSection">
      <h1>🎯 Number Guesser</h1>
      <form onSubmit={handleSubmit}>
        <p>Enter your name:</p>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Your name"
        />
        <p>Select Difficulty:</p>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy (10 attempts)</option>
          <option value="medium">Medium (7 attempts)</option>
          <option value="hard">Hard (5 attempts)</option>
        </select>
        <button type="submit">Start Game</button>
      </form>
    </div>
  )
}

export default StartGame 