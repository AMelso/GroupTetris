import { useState, useEffect } from 'react'
import { createStage } from '../files/gameHelpers'

export const useStage = (player, resetPlayer) => {
  const [ stage, setStage ] = useState(createStage())
  const [ rowsCleared, setRowsCleared ] = useState(0)

  useEffect(() => {
    setRowsCleared(0)

    const sweepRows = newStage => 
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1)
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']))
          return ack
        }
        ack.push(row)
        return ack
      }, [])

    const updateStage = prevStage => {
      // First flush the stage
      // Take the previous stage and map through each row
      const newStage = prevStage.map(row => 
        // Take the row and map through every cell
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)), // For every cell check if it is clear or filled, in which case write the new stage's cell in that row as clear or filled
      )

      // Then draw the tetromino
      // For each row
      player.tetromino.forEach((row, y) => {
        // For each cell
        row.forEach((value, x) => {
          // If the value of that cell is not 0
          if (value !== 0) {
            // Update the position of that cell on the next stage
            newStage[y + player.pos.y][x + player.pos.x] = [ // newStage at position x by y =
              value, // value of the tetromino
              `${player.collided ? 'merged' : 'clear'}`, // if it is cleared or merged
            ]
          }
        })
      })
      // Then check if we collided
      if (player.collided) {
        resetPlayer()
        return sweepRows(newStage)
      }
      return newStage
    }

    setStage(prev => updateStage(prev))
  }, [player, resetPlayer])

  return [stage, setStage, rowsCleared]
}