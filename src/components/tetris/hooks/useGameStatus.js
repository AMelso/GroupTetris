import { useState, useEffect, useCallback } from 'react'
import { GetPoints } from '../files/fireBaseIntegration'

export const useGameStatus = rowsCleared => {
  const [ oldPoints, setOldPoints ] = useState(null)
  const [ score, setScore ] = useState(0)
  const [ rows, setRows ] = useState(0)
  const [ level, setLevel ] = useState(0)

  const linePoints = [40, 100, 300, 1200]

  useEffect(() => {
    
    const retrievePoints = async () => {
      const points = await GetPoints()
      // console.log('GETTING POINTS:', points)
      setOldPoints(points)
      // console.log('USEGAMESTATUS RETRIEVED POINTS: ', oldPoints)
    }
    retrievePoints()
  }, [])

  const calcScore = useCallback(() => {
    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1))
      setRows(prev => prev + rowsCleared)
    }
  }, [level, linePoints, rowsCleared])

  useEffect(() => {
    calcScore()
  }, [calcScore, rowsCleared, score])

  return [oldPoints, setOldPoints, score, setScore, rows, setRows, level, setLevel]
}