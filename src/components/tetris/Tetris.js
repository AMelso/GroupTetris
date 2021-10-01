import React, { useEffect, useState } from 'react'

import { createStage, checkCollision } from './files/gameHelpers'
import { UpdatePoints, UpdateLeaderBoards } from './files/fireBaseIntegration'
import { GetUpgrades } from '../Pages/UpgradeFiles/UpgradesFirebase'

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'
import { TETROMINOS } from './files/tetrominos'

// Custom Hooks
import { useInterval } from './hooks/useInterval'
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'
import { useGameStatus } from './hooks/useGameStatus'

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import Lookahead from './Lookahead'

const Tetris = () => {
  const [ dropTime, setDropTime ] = useState(null)
  const [ gameOver, setGameOver ] = useState(false)
  const [ totalPoints, setTotalPoints ] = useState(null)

  const [ player, updatePlayerPos, resetPlayer, playerRotate ] = usePlayer()
  const [ stage, setStage, rowsCleared ] = useStage(player, resetPlayer)
  const [ oldPoints, setOldPoints, score, setScore, rows, setRows, level, setLevel ] = useGameStatus(rowsCleared)
  
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: (dir), y: 0})) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage())
    setDropTime(1000)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
    //console.log("Player Tetromino:", player.tetromino)
  }

  const endGame = () => {
    // console.log('GAME OVER!!!')
    setGameOver(true)
    setDropTime(null)
    // console.log('END GAME: UPDATING SCORE ON FIREBASE')
    // console.log('OLD POINTS: ', oldPoints, 'SCORE: ', score, 'TOTAL: ', totalPoints)
    UpdatePoints(totalPoints)
    UpdateLeaderBoards(totalPoints, score)
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1)
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200)
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game over
      if (player.pos.y < 1) {
        endGame()
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        // console.log('interval on')
        setDropTime(1000 / (level + 1) + 200)
      }
    }
  }

  const dropPlayer = () => {
    // console.log('interval off')
    setDropTime(null)
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1) 
      } else if (keyCode === 39) {
        movePlayer(1)
      } else if (keyCode === 40) {
        dropPlayer()
        console.log(TETROMINOS[player.queue[1]].shape)
      } else if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }

  }

  useInterval(() => {
    drop();
  }, dropTime)

  useEffect(() => {
    const updateTotalPoints = () => {
      // console.log('OLD POINTS OR SCORE CHANGED: ', oldPoints, score)
      setTotalPoints(oldPoints + score)
    }
    updateTotalPoints()
  }, [oldPoints, score])

  // Get the upgrades
  useEffect(() => {
    const retrieveUpgrades = async () => { // must be async to work properly
      const upgrades = await GetUpgrades()
      console.log('LOOK AHEAD LEVEL: ', upgrades.lookAhead)
    }
    retrieveUpgrades()
  }, [])

  return (
    <StyledTetrisWrapper
        role="button" 
        tabIndex="0" 
        onKeyDown={e => move(e)} 
        onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          { gameOver ? (
            // We may want to keep score/rows/level displayed even after game over. This code hides them.
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Total: ${totalPoints}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Lookahead tetrominos={TETROMINOS[player.queue[1]].shape} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris