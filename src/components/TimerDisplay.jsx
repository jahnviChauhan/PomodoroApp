import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Controls from './Controls';

function TimerDisplay({focusDuration, breakDuration, cycleGoal, setCycleGoal,longBreakDuration,onFullReset}) {
  const[timeLeft, setTimeLeft]= useState(focusDuration); 
  const[isRunning, setIsRunning]= useState(false);
  const[sessionType, setSessionType]= useState('focus');
  const[cycleCount, setCycleCount] = useState(0);
  const[goalAchieved, setGoalAchieved] = useState(false);


// when duration is changed from settings
  useEffect(()=>{
    if(!isRunning){
      setTimeLeft(sessionType === 'focus'? focusDuration: breakDuration)
    }
  },[focusDuration, breakDuration, sessionType, isRunning]);


  // for autoswitch
  const getSessionDuaration = (type)=>{
  switch(type){
    case 'focus': return focusDuration;
    case 'shortBreak': return breakDuration;
    case 'longBreak': return longBreakDuration;
    default : return focusDuration;
  }
};


  useEffect(()=>{
    let timer;
    if (isRunning && timeLeft >0){
      timer = setInterval(()=>{
        setTimeLeft(prev => prev-1);
      },1000);
    }else if (isRunning && timeLeft === 0){
      handleSessionSwitch();
    }
    return ()=> clearInterval(timer);
  },[isRunning, timeLeft]);

  const alertSound = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"));
  

  useEffect(()=>{
    alertSound.current.load();
  }, []);


  const handleSessionSwitch = ()=>{
    alertSound.current.play().catch((e)=>{
      console.log('playback prevented', e);
      
    });

   setIsRunning(false);
    if(sessionType === 'focus'){
      const newCount =  cycleCount+1;
      setCycleCount(newCount);
      
      if(newCount >= cycleGoal){
        setGoalAchieved(true);
      }

      if (newCount%4=== 0){
        setSessionType('longBreak');
        setTimeLeft(getSessionDuaration('longBreak'));
      }else{
        setSessionType('shortBreak');
        setTimeLeft(getSessionDuaration('shortBreak'));
      }
    }else{
      setSessionType('focus');
      setTimeLeft(getSessionDuaration('focus'));
    }
  };
  
  
  
  const startTimer = ()=> setIsRunning(true);
  const stopTimer = ()=> setIsRunning(false);
  const resetTimer = ()=> {
    setIsRunning(false);
    setTimeLeft(getSessionDuaration(sessionType));
    
    
  };
  const fullReset = ()=>{
    setIsRunning(false);
    setSessionType('focus');
    setCycleCount(0);
    setTimeLeft(getSessionDuaration('focus'));
    
    
    if(onFullReset) onFullReset();
    
    
  }
  
  
  //timer format
  const formatTime = ()=>{
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  };





  return (
    <div>
      <div className='timer-container'>
        <div className='time'>{formatTime()}
        </div>
      </div>
      <div className='session-type'>
        {sessionType === 'focus'
        ? 'Focus Mode'
        : sessionType === 'shortBreak'
        ? 'Break Time...'
        : 'Long Break Time...'}
      </div>
      <br />
      

      
       <div className='goal-status'>
        Cycles Completed: {cycleCount} / {cycleGoal}
       </div>

      

      <Controls
        onStart={startTimer}
        onStop={stopTimer}
        onReset={resetTimer}
        onFullReset={fullReset}
        isRunning={isRunning}
      />
    </div>
    
  )
}

export default TimerDisplay

