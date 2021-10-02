import React from 'react'
import { StyledLookahead } from './styles/StyledLookahead'


import Cell from './Cell'

const Lookahead = ({ tetrominos }) => (
  <StyledLookahead width={tetrominos[0].length} height={tetrominos.length}>
    {tetrominos.map(row => row.map((cell, x) => <Cell key={x} type={cell} /> ))}   
  </StyledLookahead>
)

export default Lookahead
