import React, {useEffect} from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler'
import {connect} from 'react-redux'
import Board from './board'
import {handleKeyPress} from './actions/keypress'
import {tick} from './actions/tick'
import './app.css';

function App({handleKeyPress, tick, speed}) {
  useEffect(() => {
    const scheduleTick = () => {
       setTimeout(() => {
        tick()
        scheduleTick()
       }, speed) 
    }
    scheduleTick()
  }, []);
  return (
    <div className="App">
      <Board />
      <div style={{textAlign: 'center'}}>
        <div>Controls:</div>
        <div>← →	Move </div>
        <div>↑ Rotate</div>
        <div style={{paddingLeft: '1.5em'}}> ↓	Soft drop</div>
      </div>
      <KeyboardEventHandler
        handleKeys={['left', 'right', 'up', 'down']} // TODO: implement WASD
        onKeyEvent={handleKeyPress} />
    </div>
  );
}

export default connect(
  state => ({
    speed: state.config.speed
  }),
  ({handleKeyPress, tick})
)(App)
