import { useState } from 'react'
import StartGame from './components/StartGame'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    playerName: '',
    difficulty: 'easy',
    secretNumber: null,
    attempts: null
  })

  const startGame = (playerName, difficulty) => {
    const difficultyMap = {
      easy: 10,
      medium: 7,
      hard: 5
    }
    
    setGameState({
      isPlaying: true,
      playerName,
      difficulty,
      secretNumber: Math.floor(Math.random() * 100) + 1,
      attempts: difficultyMap[difficulty]
    })
  }

  const restartGame = () => {
    const difficultyMap = {
      easy: 10,
      medium: 7,
      hard: 5
    }
    
    setGameState(prev => ({
      ...prev,
      secretNumber: Math.floor(Math.random() * 100) + 1,
      attempts: difficultyMap[prev.difficulty]
    }))
  }

  const logout = () => {
    setGameState({
      isPlaying: false,
      playerName: '',
      difficulty: 'easy',
      secretNumber: null,
      attempts: null
    })
  }

  return (
    <div className="container">
      {!gameState.isPlaying ? (
        <StartGame onStart={startGame} />
      ) : (
        <GameBoard 
          gameState={gameState}
          setGameState={setGameState}
          onRestart={restartGame}
          onLogout={logout}
        />
      )}
    </div>
  )
}

export default App
