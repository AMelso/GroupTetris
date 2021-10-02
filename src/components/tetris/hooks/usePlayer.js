import { useState, useCallback, useEffect, useRef } from 'react'

import { checkCollision, STAGE_WIDTH } from '../files/gameHelpers'
import { TETROMINOS } from '../files/tetrominos'

export const usePlayer = () => {

  const [ final, setFinal ] = useState('IJLOSTZ')
  const [ count, setCount ] = useState(0)
  const ref = useRef(final)
  
  const [ player, setPlayer ] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
    queue: ref.current,
  })
  
  // initializes and updates the queue of next blocks
  useEffect(() => {
    const tetrominos = 'IJLOSTZ'
    const updateString = () => {
      let randLetter = Math.floor(Math.random() * tetrominos.length)
      setFinal(prev => (prev.substring(1))+tetrominos[randLetter])
      ref.current = final
    }
    updateString()
  }, [count])

  const rotate = (matrix, dir) => {
    // Make the rows into columns (transpose)
    const rotatedTetro = matrix.map((_, index) => 
      matrix.map(col => col[index])
    )
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map(row => row.reverse())
    return rotatedTetro.reverse()
  }

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

    const pos = clonedPlayer.pos.x
    let offset = 1
    while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir)
        clonedPlayer.pos.x = pos
        return
      }
    }

    setPlayer(clonedPlayer)
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: TETROMINOS[ref.current[0]].shape,
      collided: false,
      queue: ref.current
    })
    nextTetromino();
  }, [])
 
  const nextTetromino = () => {  
    setCount(prev => prev+1)
  }

  return [player, updatePlayerPos, resetPlayer, playerRotate ]
}