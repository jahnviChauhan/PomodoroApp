import React from 'react'

function Settings({focusDuration, breakDuration, longBreakDuration, setFocusDuration, setBreakDuration, setLongBreakDuration, cycleGoal, setCycleGoal}) {
  // for user input
  const handleFocusChange = (e)=>{
    const value = parseInt(e.target.value);
    if(!isNaN(value)) {
      setFocusDuration(value * 60);
    }
  };

  const handleBreakChange = (e)=>{
    const value = parseInt(e.target.value);
    if(!isNaN(value)){
      setBreakDuration(value * 60);
    }
  };

  const handleLongBreakChange = (e)=>{
    const value = parseInt(e.target.value);
    if(!isNaN(value)){
      setLongBreakDuration(value*60);
    }
  };


  return(
    <div className='settings-container'>
      <div className='setting'>
        <label htmlFor='focus-input'>Focus Time(mins)</label>
        <input 
          id='focus-input'
          type='number'
          min={1}
          value={Math.floor(focusDuration/60)}
          onChange={handleFocusChange}
        />
      </div>
      
      
      <div className="break-settings">
        <div className='setting'>
          <label htmlFor='break-input'>Break Time(mins)</label>
          <input
            id='break-input'
            type='number'
            min={1}
            value={Math.floor(breakDuration/60)}
            onChange={handleBreakChange}
          />
        </div>

        <div className='setting'>
          <label htmlFor='longbreak-input'>Long Break Time(mins)</label>
          <input
            id='longbreak-input'
            type='number'
            min={1}
            value={Math.floor(longBreakDuration/60)}
            onChange={handleLongBreakChange}
          />
        </div>

      </div>
      <div className='setting'>
        <label htmlFor="goal-input">Goal</label>
        <input 
          id='goal-input'
          type='number'
          value={cycleGoal}
          onChange={(e)=> setCycleGoal(Number(e.target.value))}
          min="1"

        />
      </div>
    </div>
  )
  
  
}

export default Settings



