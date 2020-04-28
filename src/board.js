import React from 'react'
import {connect} from 'react-redux'
import Piece from './piece'

const Board = ({scale, activePiece, pieces}) => {
  console.log(activePiece.shape)
  const height = 20 * scale
  return <div style={{position: 'relative', height: height + 'px', width: (height/2) + 'px', border: '2px solid black', margin: 'auto'}}>
    <Piece {...{...activePiece}} />
    {pieces.map((piece, i) => <Piece {...{...piece, key: 'piece-' + i}} /> )}
  </div>
}

export default connect(
  state => ({
    scale: state.config.scale,
    activePiece: state.board.activePiece,
    pieces: state.board.pieces
  })
)(Board)