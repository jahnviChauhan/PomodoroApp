import React, { useState, useEffect, useRef } from 'react';
import Controls from './Controls';

function TimerDisplay({ focusDuration, breakDuration, longBreakDuration, cycleGoal, setCycleGoal, onFullReset }) {
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('focus');
  const [cycleCount, setCycleCount] = useState(0);
  const [goalAchieved, setGoalAchieved] = useState(false);

  const alertSound = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"));

  // Load sound
  useEffect(() => {
    alertSound.current.load();
  }, []);

  // Update timer when durations or sessionType change
  useEffect(() => {
    setTimeLeft(
      sessionType === 'focus'
        ? focusDuration
        : sessionType === 'shortBreak'
        ? breakDuration
        : longBreakDuration
    );
  }, [focusDuration, breakDuration, longBreakDuration, sessionType]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleSessionSwitch();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Switch between sessions
  const handleSessionSwitch = () => {
    alertSound.current.play().catch(e => {
      console.log('Playback prevented:', e);
    });

    setIsRunning(false);

    if (sessionType === 'focus') {
      const newCount = cycleCount + 1;
      setCycleCount(newCount);
      if (newCount >= cycleGoal) {
        setGoalAchieved(true);
      }

      setSessionType(newCount % 4 === 0 ? 'longBreak' : 'shortBreak');
    } else {
      setSessionType('focus');
    }
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getSessionDuration(sessionType));
  };

  const fullReset = () => {
    setIsRunning(false);
    setSessionType('focus');
    setCycleCount(0);
    setTimeLeft(focusDuration);
    setGoalAchieved(false);
    if (onFullReset) onFullReset();
  };

  // Determine session duration
  const getSessionDuration = type => {
    switch (type) {
      case 'focus': return focusDuration;
      case 'shortBreak': return breakDuration;
      case 'longBreak': return longBreakDuration;
      default: return focusDuration;
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <div className='timer-container'>
        <div className='time'>{formatTime()}</div>
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
  );
}

export default TimerDisplay;
