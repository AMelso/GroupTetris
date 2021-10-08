import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'

import { createStage, checkCollision } from './files/gameHelpers'
import { UpdatePoints, UpdateLeaderBoards } from './files/fireBaseIntegration'
import { GetUpgrades } from '../Pages/UpgradeFiles/UpgradesFirebase'

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'
import { TETROMINOS } from './files/tetrominos'
import { Grid } from './styles/StyledLookahead'

// Custom Hooks
import { useInterval } from './hooks/useInterval'
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'
import { useGameStatus } from './hooks/useGameStatus'

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { useAuthState } from '../../firebase'
import Lookahead from './Lookahead'

const Tetris = () => {
  const [ dropTime, setDropTime ] = useState(null)
  const [ varDropSpeed, setVarDropSpeed ] = useState(null)
  const [ gameOver, setGameOver ] = useState(false)
  const [ totalPoints, setTotalPoints ] = useState(null)
  const [ look, setLook ] = useState([])

  const [ player, updatePlayerPos, resetPlayer, playerRotate ] = usePlayer()
  const [ stage, setStage, rowsCleared ] = useStage(player, resetPlayer)
  const [ oldPoints, setOldPoints, score, setScore, rows, setRows, level, setLevel ] = useGameStatus(rowsCleared)
  
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: (dir), y: 0})) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    /* if(user?.displayName === null){
      alert("You need to setup your profile name first!");
      return false;
    }*/
    // Reset everything
    setStage(createStage())
    resetPlayer()
    setGameOver(false)
    setDropTime(100)
    // setDropTime(varDropSpeed)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const endGame = () => {
    // console.log('GAME OVER!!!!')
    setGameOver(true)
    setDropTime(null)
    // console.log('END GAME: UPDATING SCORE ON FIREBASE')
    // console.log('OLD POINTS: ', oldPoints, 'SCORE: ', score, 'TOTAL: ', totalPoints)
    UpdatePoints(totalPoints)
    UpdateLeaderBoards(totalPoints, score);
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1)
      // Also increase speed
      // setDropTime(varDropSpeed / (level + 1) + 200)
      setDropTime(100)
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
        // setDropTime(varDropSpeed / (level + 1) + 200)
        setDropTime(100)
      }
    }
  }

  const dropPlayer = () => {
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
      } else if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }

  }

  useInterval(() => {
    drop();
  }, dropTime)

  // Updates Points
  useEffect(() => {
    const updateTotalPoints = () => {
      setTotalPoints(oldPoints + score)
    }
    updateTotalPoints()
  }, [oldPoints, score])

  

  // Get the upgrades
  useEffect(() => {
    const retrieveUpgrades = async () => { // must be async to work properly
      let lookConst = [];
      const upgradeHolder = await GetUpgrades()

      // for loop builds array used in rendering lookahead components
      // tiedl to the lookAhead portion of GetUpgrades() above
      for (let x = 1; x < upgradeHolder.lookAhead+1; x++) {
        lookConst.push(x)
      }
      setLook(lookConst)

      // Get dropSpeed level and multiply by 100 then add to 1000 for final dropTime
      const dropSpeed = (upgradeHolder.dropSpeed * 100) + 500
      setVarDropSpeed(dropSpeed)
    }
    retrieveUpgrades()
  }, [])

  // const UpgradesRedirect = () => {
  //   props.history.push("/upgrades");
  // }

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
            <>
            <Display gameOver={gameOver} text="Game Over" />
            <Redirect to="/upgrade" />
            </>
          ) : (
            <div>
              <div>
              <Display text={`Total: ${totalPoints}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              </div>
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
        <>
          { gameOver ? (
            <div></div>
          ) : ( // Renders the lookAhead Components using the state array look
              <Grid>
              <label style={{ color: '#737373', fontFamily: 'Pixel', fontSize: '0.8rem'}} color="white">Next Pieces</label>
              {look.map((data,id)=>{
                return <Lookahead tetrominos={TETROMINOS[player.queue[data]].shape} key={id} />
              })}
              </Grid>
          )}
        </>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
