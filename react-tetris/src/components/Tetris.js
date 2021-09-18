import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log('re-render');
  //console.log(player.pos)
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const checkBoard = () => {
    for (let _y = 0; _y < stage.length; _y+=1) {
      for (let _x = 0; _x < stage[_y].length; _x+=1) {
        if (stage[_y][_x][1] !== 'clear') {
          console.log("Board is not clear")
          return false;
        }
      }
    }
    return true;
  }

  const findBottom = () => {
    let row = []
    for (let _y = player.tetromino.length-1; _y > 0; _y-=1) {
      for (let _x = 0; _x < player.tetromino[0].length; _x+=1) {
        if (player.tetromino[_y][_x] !== 0) {
          row[_x] = true
        } else { row[_x] = false }
      }
      if (row.includes(true)) {
        return row
      }
    }
    return false;
  }

  const emptyColumn = () => {
    // find the highest empty row
    let e_row = null; // will equal the highest empty row
    console.log("Debug e_row: ",e_row)
    //console.log("stage length: ", stage.length-1)
    for (let ey = stage.length-1; ey > 0; ey-=1) {
      console.log("Working row: ", ey)
      let empty = true;
      for (let ex = 0; ex < stage[0].length; ex+=1) {
        //console.log("Working column: ", ex)
        if (stage[ey][ex][0] !== 0) {
          console.log(stage)
          console.log(stage[ey][ex])
          console.log("found false in row: ", ey)
          empty = false;
          break;
        }
      }
      if (empty === true) {
        console.log("Found empty row at :", ey)
        e_row = ey
        break;
      }
    }

    console.log("Debug e_row: ",e_row)
    let col = []
    // for bottom row only
    if (e_row === 19) {
      console.log(stage[e_row-1])
      for (let _x = 0; _x < stage[e_row].length; _x+=1) {
        col[_x] = true;
        if (stage[e_row][_x][0] !== 0) {
          col[_x] = false;
        }
      }
    } else if (e_row !== null) {
      console.log(stage[e_row-1])
      for (let _x = 0; _x < stage[e_row].length; _x+=1) {
        col[_x] = true;
        if (stage[e_row+1][_x][0] !== 0) {
          col[_x] = false;
        }
      }
    }
    return col
  }

  const autoPlay = () => {
    let col = emptyColumn()
    console.log("Columns: ", col)
    console.log("Player Pos: ", player.pos)
    if (col[player.pos.x+1] === false) {
      // if (col[player.pos.x-1] === )
       movePlayer(1)
    }

    // console.log(findBottom())
    // console.log(emptyColumn())
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(100);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
    autoPlay();
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
