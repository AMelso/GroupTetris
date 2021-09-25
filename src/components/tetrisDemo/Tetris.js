import React, { useState, useEffect } from 'react'

import { createStage, checkCollision } from './files/gameHelpers'

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

// Custom Hooks
import { useInterval } from './hooks/useInterval'
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'
import { useGameStatus } from './hooks/useGameStatus'

// Components
import Stage from './Stage'
import Display from './Display'
import AI from './ai'

const TetrisDemo = () => {
  const [ dropTime, setDropTime ] = useState(null)
  const [ gameOver, setGameOver ] = useState(false)

  const [ player, updatePlayerPos, resetPlayer, playerRotate ] = usePlayer()
  const [ stage, setStage, rowsCleared ] = useStage(player, resetPlayer)
  const [ score, setScore, rows, setRows, level, setLevel ] = useGameStatus(rowsCleared)

  console.log('re-render')

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: (dir), y: 0})) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage())
    setDropTime(100)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const autoPlay = async () => {
    let move = await AI(player, stage)
    console.log(move[1])
    if (move[1] !== 0) {
      for (let x = move[1]; x > 0; x--) {
        playerRotate(stage, 1)
      }
    }
    
    let blank = true
    for (let y = 0; y < player.tetromino.length; y++) {
        if (player.tetromino[y][0] !== 0) {
            blank = false
        }
    }

    if (blank) {
      if (move[0] === 0) {
          movePlayer(-1)
      } else if (move[0] < player.pos.x) {
          movePlayer(-1)
      } else if (move[0] > player.pos.x) {
          movePlayer(1)
      }
    } else {
      // no blank column next to the piece
      if (move[0] !== player.pos.x) {
        if (move[0] < player.pos.x) {
          movePlayer(-1)
        } else if (move[0] > player.pos.x) {
          movePlayer(1)
        }
      }
    }
  }
  
  useInterval(() => {
    autoPlay();
    drop();
  }, dropTime)

  useEffect(() => {
    startGame();
  }, [gameOver]) 

  return (
    <StyledTetrisWrapper
        role="button" 
        tabIndex="0">
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default TetrisDemo