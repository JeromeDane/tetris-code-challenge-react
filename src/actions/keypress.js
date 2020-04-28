import {moveLeft, moveRight, moveDown, rotate} from './piece'

export const handleKeyPress = key => {
  // console.log(key, 'pressed')
  switch(key) {
    case 'left': return moveLeft()
    case 'right': return moveRight()
    case 'down': return moveDown()
    case 'up': return rotate()
    default: console.log(key + ' pressed')
  }  
}