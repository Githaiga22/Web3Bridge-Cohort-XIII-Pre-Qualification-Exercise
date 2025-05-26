import { useState, useEffect } from 'react'

function GameBoard({ gameState, setGameState, onRestart, onLogout }) {
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [gameResult, setGameResult] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)

  // Reset local state when game restarts
  useEffect(() => {
    if (gameState.attempts > 0) {
      setGuess('')
      // setFeedback('')
      setGameResult('')
      setIsGameOver(false)
    }
  }, [gameState.attempts])

  const handleGuess = (e) => {
    e.preventDefault()
    const guessNumber = parseInt(guess)

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setFeedback(`⚠️ ${gameState.playerName}, please enter a valid number between 1 and 100.`)
      return
    }

    const newAttempts = gameState.attempts - 1
    setGameState(prev => ({ ...prev, attempts: newAttempts }))

    if (guessNumber === gameState.secretNumber) {
      setFeedback(`🎉 Well done, ${gameState.playerName}! You guessed it right!`)
      setGameResult('🏆 You Win!')
      setIsGameOver(true)
    } else if (newAttempts === 0) {
      setFeedback(`💀 Sorry, ${gameState.playerName}. No attempts left! The number was ${gameState.secretNumber}.`)
      setGameResult('❌ Game Over!')
      setIsGameOver(true)
    } else {
      const hint = guessNumber < gameState.secretNumber ? 'too low' : 'too high'
      setFeedback(`🤔 ${gameState.playerName}, that's ${hint}. Try again!`)
    }

    setGuess('')
  }

  return (
    <div id="gameSection">
      <div className="header">
        <h2>🎮 Welcome, {gameState.playerName}!</h2>
        <button onClick={onLogout} className="logout-btn">
          👋 Logout
        </button>
      </div>
      <p>Difficulty: {gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1)} ({gameState.attempts} attempts)</p>
      <p>Guess a number between 1 and 100:</p>
      <form onSubmit={handleGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your guess..."
          disabled={isGameOver}
        />
        <button type="submit" disabled={isGameOver}>Submit Guess</button>
      </form>
      <p id="feedback">{feedback}</p>
      <p id="remainingAttempts">Attempts left: {gameState.attempts}</p>
      <p id="gameResult" style={{ color: gameResult.includes('Win') ? '#28c76f' : '#e63946' }}>
        {gameResult}
      </p>
      {isGameOver && (
        <button onClick={onRestart} id="restartBtn">
          🔁 Restart
        </button>
      )}
    </div>
  )
}

export default GameBoard 