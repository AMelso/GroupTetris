import React, { useState } from 'react'

import { createStage, checkCollision } from './files/gameHelpers'

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

// Custom Hooks
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {
  const [ dropTime, setDropTime ] = useState(null)
  const [ gameOver, setGameOver ] = useState(false)

  const [ player, updatePlayerPos, resetPlayer ] = usePlayer()
  const [ stage, setStage ] = useStage(player)

  console.log('re-render')

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: (dir * 2), y: 0})) { // FIXED DOUBLE MOVE ERROR, SHOULD BE { x: dir, y: 0}
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage())
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: .5, collided: false }) // FIXING DOUBLE MOVE ERROR, Y SHOULD BE 1
  }

  const dropPlayer = () => {
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-.5) // FIXING DOUBLE MOVE ERROR, SHOULD BE 1
      } else if (keyCode === 39) {
        movePlayer(.5) // FIXING DOUBLE MOVE ERROR, SHOULD BE 1
      } else if (keyCode === 40) {
        dropPlayer()
      }
    }

  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          { gameOver ? (
            // We may want to keep score/rows/level displayed even after game over. This code hides them.
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris