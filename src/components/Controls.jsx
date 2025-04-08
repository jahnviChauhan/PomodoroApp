import React from 'react'
import '../App.css'

function Controls({onStart, onStop, onReset, onFullReset, isRunning,}) {
  return (
    <div className='controls-container'>
        {!isRunning && <button onClick={onStart}>Start</button>}
        {isRunning && <button onClick={onStop}>Stop</button>}
        <button onClick={onReset}>Reset</button>
        <button onClick={onFullReset}>Full Reset</button>
      
    </div>
  );
}

export default Controls




