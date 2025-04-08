import React, { useState, useEffect } from 'react'

function Settings({focusDuration, breakDuration, longBreakDuration, setFocusDuration, setBreakDuration, setLongBreakDuration, cycleGoal, setCycleGoal}) {
  const [focusInput, setFocusInput] = useState(focusDuration / 60);
  const [breakInput, setBreakInput] = useState(breakDuration / 60);
  const [longBreakInput, setLongBreakInput] = useState(longBreakDuration / 60);

  useEffect(() => {
    setFocusInput(focusDuration / 60);
  }, [focusDuration]);

  useEffect(() => {
    setBreakInput(breakDuration / 60);
  }, [breakDuration]);

  useEffect(() => {
    setLongBreakInput(longBreakDuration / 60);
  }, [longBreakDuration]);

  const handleFocusChange = (e) => {
    const value = e.target.value;
    setFocusInput(value);
    if (value === '') return;
    const num = parseInt(value);
    if (!isNaN(num)) {
      setFocusDuration(num * 60);
    }
  };

  const handleBreakChange = (e) => {
    const value = e.target.value;
    setBreakInput(value);
    if (value === '') return;
    const num = parseInt(value);
    if (!isNaN(num)) {
      setBreakDuration(num * 60);
    }
  };

  const handleLongBreakChange = (e) => {
    const value = e.target.value;
    setLongBreakInput(value);
    if (value === '') return;
    const num = parseInt(value);
    if (!isNaN(num)) {
      setLongBreakDuration(num * 60);
    }
  };

  return (
    <div className='settings-container'>
      <div className='setting'>
        <label htmlFor='focus-input'>Focus Time(mins)</label>
        <input 
          id='focus-input'
          type='number'
          min={1}
          value={focusInput}
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
            value={breakInput}
            onChange={handleBreakChange}
          />
        </div>

        <div className='setting'>
          <label htmlFor='longbreak-input'>Long Break Time(mins)</label>
          <input
            id='longbreak-input'
            type='number'
            min={1}
            value={longBreakInput}
            onChange={handleLongBreakChange}
          />
        </div>
      </div>

      <div className='setting'>
        <label htmlFor="goal-input">Goal</label>
        <input 
          id='goal-input'
          type='number'
          min={1}
          value={cycleGoal === 0 ? '' : cycleGoal}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '') {
              setCycleGoal('');
            } else {
              const num = parseInt(val);
              if (!isNaN(num)) setCycleGoal(num);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Settings;
