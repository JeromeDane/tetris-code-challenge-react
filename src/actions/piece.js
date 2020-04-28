export const PIECE_MOVE_LEFT = 'PIECE_MOVE_LEFT'
export const PIECE_MOVE_RIGHT = 'PIECE_MOVE_RIGHT'
export const PIECE_MOVE_DOWN = 'PIECE_MOVE_DOWN'
export const PIECE_ROTATE = 'PIECE_ROTATE'

export const moveLeft = () => ({type: PIECE_MOVE_LEFT})
export const moveRight = () => ({type: PIECE_MOVE_RIGHT})
export const moveDown = () => ({type: PIECE_MOVE_DOWN})
export const rotate = () => ({type: PIECE_ROTATE})