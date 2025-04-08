import './App.css'
import { useState } from 'react'
import TimerDisplay from './components/TimerDisplay'
import Controls from './components/Controls'
import Settings from './components/Settings'


function App() {
  const [focusDuration, setFocusDuration]= useState(25*60);
  const [breakDuration, setBreakDuration] = useState(5*60);
  const [cycleGoal, setCycleGoal] = useState(4);
  const [longBreakDuration, setLongBreakDuration]= useState(15*60);
  const [theme, setTheme] = useState('light');

  const toggleTheme = ()=>{
    setTheme(prev =>(prev === 'light'? 'dark': 'light'));
  };

  // full reset function
  const handleFullReset = ()=>{
    setFocusDuration(25*60);
    setBreakDuration(5*60);
    setLongBreakDuration(15*60);
    setCycleGoal(4);
  }

  return (
    <>
      <div className= {`pomodoro-container ${theme}`}>

        <button className='theme-toggle' onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode': 'Light Mode'}
        </button>

        <h1 className='app-name'>Pomodoro Timer</h1>
        <TimerDisplay
         focusDuration = {focusDuration}
         breakDuration = {breakDuration}
         cycleGoal={cycleGoal}
         setCycleGoal={setCycleGoal}
         longBreakDuration = {longBreakDuration}
         onFullReset ={handleFullReset}
        />
          
        <Settings
          focusDuration = {focusDuration}
          breakDuration = {breakDuration}
          longBreakDuration = {longBreakDuration}
          setFocusDuration = {setFocusDuration}
          setBreakDuration = {setBreakDuration}
          setLongBreakDuration = {setLongBreakDuration}
          cycleGoal = {cycleGoal}
          setCycleGoal = {setCycleGoal}
          />
        
      </div>
     
    </>
  )
}

export default App
