import {
  PIECE_MOVE_LEFT, 
  PIECE_MOVE_RIGHT,
  PIECE_MOVE_DOWN,
  PIECE_ROTATE
} from '../actions/piece'
import {TICK} from '../actions/tick'

const types = ['T', 'O', 'I', 'S', 'Z', 'J', 'L']

function Piece() {
  const type = types[Math.floor(Math.random() * types.length)]
  // const type = 'Z'
  switch(type) {
    case 'T': return {
      row: 0, 
      column: 3, 
      color: '#D23BE7',
      shape: [
        [1,1,1],
        [0,1,0]
      ]
    }
    case 'O': return {
      row: 0, 
      column: 4, 
      color: '#F7D038',
      shape: [
        [1,1],
        [1,1]
      ]
    }
    case 'I': return {
      row: 0, 
      column: 3, 
      color: '#34BBE6',
      shape: [
        [1,1,1,1]
      ]
    }
    case 'S': return {
      row: 0, 
      column: 3, 
      color: '#48E04B',
      shape: [
        [0,1,1],
        [1,1,0]
      ]
    }
    case 'Z': return {
      row: 0, 
      column: 3, 
      color: '#E6261F',
      shape: [
        [1,1,0],
        [0,1,1]
      ]
    }
    case 'J': return {
      row: 0, 
      column: 3, 
      color: '#4355DB',
      shape: [
        [1,0,0],
        [1,1,1]
      ]
    }
    case 'L': return {
      row: 0, 
      column: 3, 
      color: '#EB7532',
      shape: [
        [0,0,1],
        [1,1,1]
      ]
    }
    default: return {}
  }
}

// I looked up rotating a 2d matrix 90% on Google to save time. I hope this isn't cheating 
// I probably could have figured this on my own given enough time,
// but wanted to focus on solving the whole problem rather than 
// this complicated implementation detail
// Source: https://medium.com/front-end-weekly/matrix-rotation-%EF%B8%8F-6550397f16ab
const reverse = array => [...array].reverse();
const compose = (a, b) => x => a(b(x));
const flipMatrix = matrix => (
  matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ))
);
const rotateMatrix = compose(flipMatrix, reverse);
// end copied code

const rotate = piece => {
  return {...piece, shape: rotateMatrix(piece.shape)}
}

const getLeftBound = piece => { // TODO: Fix BUGGED for S and Z pieces
  for(let col = 0; col < piece.shape[0].length; col++)
    for(let row = 0; row < piece.shape.length; row++)
      if(piece.shape[row][col]) return col + piece.column
}

const getRightBound = piece => {  // TODO: Fix BUGGED for S and Z pieces
  for(let col = piece.shape[0].length - 1; col > 0 ; col--)
    for(let row = 0; row < piece.shape.length; row++)
      if(piece.shape[row][col]) return col + piece.column
}

const getBottomBound = piece => {
  for(let row = piece.shape.length - 1; row > -1; row++)
    for(let col = piece.shape[0].length - 1; col > -1 ; col--)
      if(piece.shape[row][col]) return row + piece.row
}

const getTopBound = piece => {
  for(let col = piece.shape[0].length - 1; col > -1 ; col--)
    // for(let row = piece.shape.length - 1; row > -1; row++)
      if(piece.shape[0][col]) return piece.row
}

const collision = (occupied, piece) => {
  for(let row = 0; row < piece.shape.length; row++)
    for(let col = 0; col < piece.shape[0].length; col++)
      if(piece.shape[row][col] && occupied[piece.row + row][piece.column + col]) 
        return true
  return false
}

const occupy = (occupied, piece) => {
  for(let row = 0; row < piece.shape.length; row++)
    for(let col = 0; col < piece.shape[0].length; col++)
      if(piece.shape[row][col]) 
        occupied[piece.row + row][piece.column + col] = 1
  return occupied
}

const resetOccuppied = () => {
  const occupied = []
  for(let i = 0; i < 20; i++)
    occupied.push(new Array(9).fill(0))
  return [...occupied]
}

const resetState = () => {
  return {
    occupied: resetOccuppied(),
    activePiece: new Piece(),
    pieces: []
  }
}

export default (state = resetState(), action) => {
  const {activePiece, pieces, occupied} = state
  if(
    action.type === PIECE_MOVE_LEFT && 
    getLeftBound(activePiece) > 0 &&
    !collision(occupied, {...activePiece, column: activePiece.column - 1})
  ) { // TODO: bounds in state instead of recalculating each time
    state = {...state, activePiece: {...activePiece, column: activePiece.column - 1}}
  }
  if(
    action.type === PIECE_MOVE_RIGHT && 
    getRightBound(activePiece) < 9 &&
    !collision(occupied, {...activePiece, column: activePiece.column + 1})
  ) {
    state = {...state, activePiece: {...activePiece, column: activePiece.column + 1}}
  }
  if(
    (action.type === PIECE_MOVE_DOWN || action.type === TICK) && 
    getBottomBound(activePiece) < 19 &&
    !collision(occupied, {...activePiece, row: activePiece.row + 1})
  ) {
    state = {...state, activePiece: {...activePiece, row: activePiece.row + 1}}
  }
  if(action.type === PIECE_ROTATE) {
    // I looked up transposing a 2d array to save time on this implementation:
    // Source: https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    //
    // TODO: implement full rotation rather than just back and forth! (implementation is not what I wanted)
    state = {...state, activePiece: rotate(activePiece)}
  }
  if(action.type === TICK) {
    if(getTopBound(activePiece) == 0 && collision(occupied, {...activePiece, row: activePiece.row + 1})) {
      alert('Game Over')
      return resetState()
    }
    else if(getBottomBound(activePiece) == 19 || collision(occupied, {...activePiece, row: activePiece.row + 1})) {
      state = {
        ...state, 
        pieces: [...pieces, activePiece], 
        activePiece: new Piece(),
        occupied: occupy(occupied, activePiece)
      }
    }
  }
  return state
}