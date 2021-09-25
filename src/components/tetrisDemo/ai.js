import lodash from 'lodash'

import { checkCollision } from './files/gameHelpers'

const AI = (player, stage) => {
  
  const a = -0.51066
  const b = 0.76066
  const c = -0.35663
  const d = -0.184483

  let playerCopy = lodash.cloneDeep(player)
  let stageCopy = lodash.cloneDeep(stage)
  
  const rotate = (matrix, dir) => {
    // Make the rows into columns (transpose)
    const rotatedTetro = matrix.map((_, index) => 
      matrix.map(col => col[index])
    )
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse())
    return rotatedTetro.reverse()
  }
  
  const updatePlayerPos = (playerCopy, x, y, collided) => {
      playerCopy.pos.x += x
      playerCopy.pos.y += y
      player.collided = collided
  }
  
  const updateStage = (playerCopy, stageCopy) => {
    // First flush the stage
    // Take the previous stage and map through each row
    const newStage = stageCopy.map(row => 
      // Take the row and map through every cell
      row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)), // For every cell check if it is clear or filled, in which case write the new stage's cell in that row as clear or filled
    )

    // Then draw the tetromino
    // For each row
    playerCopy.tetromino.forEach((row, y) => {
      // For each cell
      row.forEach((value, x) => {
        // If the value of that cell is not 0
        if (value !== 0) {
          // Update the position of that cell on the next stage
          newStage[y + playerCopy.pos.y][x + playerCopy.pos.x] = [ // newStage at position x by y =
            value, // value of the tetromino
            `${playerCopy.collided ? 'merged' : 'clear'}`, // if it is cleared or merged
          ]
        }
      })
    })
    return newStage
  }
  
  // !!!!!!!!! - Scoring functions

  const holes = (arenaCopy) => {
    let holes = 0
    for (let x = 0; x < arenaCopy[0].length; x++) {
        for (let y = arenaCopy.length-1; y > -1; y--) {
            if (arenaCopy[y][x][0] === 0) {
                let count = 0;
                for (let i = y-1; i > 0; i--) {
                    count++
                    if (arenaCopy[i][x][0] !== 0) {
                        holes = holes+count
                        break;
                    }
                }
            }
        }
    }
    return holes
  }

  const aggregateHeight = (arenaCopy) => {
    let work = []
    for (let x = 0; x < arenaCopy[0].length; x++) {
        let current = 0
        for (let y = arenaCopy.length-1; y > -1; y--) {
            if (arenaCopy[y][x][0] !== 0) {
                current = 20-y
            }
        }
        work.push(current)
    }

    let final = lodash.sum(work)
    return final
  }

  const bump = (arenaCopy) => {
    let work = []
    for (let x = 0; x < arenaCopy[0].length; x++) {
        let current = 0
        for (let y = arenaCopy.length-1; y > -1; y--) {
            if (arenaCopy[y][x][0] !== 0) {
                current = 20-y
            }
        }
        work.push(current)
    }
    
    let bump = 0;
    for (let i = 0; i < work.length; i+=1) {
        if (i+1 < work.length)
            bump = bump + Math.abs(work[i]-work[i+1])
    }
    return bump
  }
  
  const completedLines = (arenaCopy) => {
    let count = 0;
    for (let y = 0; y < arenaCopy.length; y++) {
      let full = true
      for (let x = 0; x < arenaCopy[0].length; x++) {
        if (arenaCopy[y][x][0] === 0) {
          full = false
        }
      }  
      if (full) {
        count++
      }
    }
    return count
  }

  const simulate = () => {
    let finalS = -200;
    let posX = null;
    let finalR = null;
    let count = 0;

    for (let r=0; r<4; r++) {
      for (let x = 0; x < stageCopy[0].length-1; x++) {
        let rc = r;
        let playerCopy = lodash.cloneDeep(player)
        let stageCopy = lodash.cloneDeep(stage)

        while (rc > 0) {
          let pos = playerCopy.pos.x
          let offset = 1
          playerCopy.tetromino = rotate(playerCopy.tetromino, 1)
          while(checkCollision(playerCopy, stageCopy, { x: 0, y: 0 })) {
            playerCopy.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            if (offset > playerCopy.tetromino[0].length) {
              playerCopy.tetromino = rotate(playerCopy.tetromino, -1)
              playerCopy.pos.x = pos
              break;
            }
          }
          rc-=1
        }

        playerCopy.pos.y = 0
        playerCopy.pos.x = 0
        
        for (let m = x; m > 0; m--) {
          if (checkCollision(playerCopy, stageCopy, { x: 1, y: 0})) {
          } else {
            playerCopy.pos.x += 1
          }
        }

        while (!checkCollision(playerCopy, stageCopy, { x: 0, y: 1})) {
           updatePlayerPos(playerCopy, 0, 1, false)
        }

        stageCopy = updateStage(playerCopy, stageCopy);
        
        let lines = completedLines(stageCopy)
        let aggHeight = aggregateHeight(stageCopy)
        let holeCount = holes(stageCopy)
        let bumpCount = bump(stageCopy)

        let score = (a * aggHeight) + (b * lines) + (c * holeCount) + (d * bumpCount)

        if (score > finalS) {
            posX = x
            finalS = score
            finalR = r
        }
        count++
      }
    }
    return [posX, finalR]
  }
  
  let ai_guess = simulate()
  return ai_guess
}

export default AI