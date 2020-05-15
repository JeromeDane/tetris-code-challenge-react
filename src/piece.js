import React from 'react'
import {connect} from 'react-redux'

const Piece = ({scale, row, column, shape, color}) => {
  return (
    <div style={{position: 'absolute', top: (row * scale) + 'px', left: (column * scale) + 'px' }}>
      {shape.reduce((blocks, row, rowI) => {
        blocks.push(row.reduce((rowBlocks, draw, colI) => {
          if(draw) {
            rowBlocks.push(
              <div style={{
                position: 'absolute', 
                width: scale + 'px', 
                height: scale + 'px', 
                background: color, 
                top: (rowI * scale) + 'px', 
                left: (colI * scale) + 'px',
                border: '2px outset #333',
                boxSizing: 'border-box'                
              }} key={rowI + '' + colI} />
            )
          }
          return rowBlocks
        }, []))
        return blocks
      }, [])}
    </div>
  )
}

export default connect(
  state => ({
    scale: state.config.scale
  })
)(Piece)