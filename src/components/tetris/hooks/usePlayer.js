import { useState, useCallback, useEffect, useRef } from 'react'

import { checkCollision, STAGE_WIDTH } from '../files/gameHelpers'

export const usePlayer = () => {
  
  const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
      shape:  [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
              ],
      color: '80, 227, 230',
    },
    J: {
      shape:  [
                [0, 'J', 0],
                [0, 'J', 0],
                ['J', 'J', 0],
              ],
      color: '36, 95, 223',
    },
    L: {
      shape:  [
                [0, 'L', 0],
                [0, 'L', 0],
                [0, 'L', 'L'],
              ],
      color: '223, 173, 36',
    },
    O: {
      shape:  [
                ['O', 'O'],
                ['O', 'O'],
              ],
      color: '223, 217, 36',
    },
    S: {
      shape:  [
                [0, 'S', 'S'],
                ['S', 'S', 0],
                [0, 0, 0],
              ],
      color: '48, 211, 56',
    },
    T: {
      shape:  [
                [0, 0, 0],
                ['T', 'T', 'T'],
                [0, 'T', 0],
              ],
      color: '132, 61, 198',
    },
    Z: {
      shape:  [
                ['Z', 'Z', 0],
                [0, 'Z', 'Z'],
                [0, 0, 0],
              ],
      color: '227, 78, 78',
    },
  }

  const [ final, setFinal ] = useState('IJLOSTZ')
  const [ count, setCount ] = useState(0)
  const ref = useRef(final)
  
  const [ player, setPlayer ] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
    queue: ref.current,
  })
  


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
    //console.log("resetPlayer", ref)
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