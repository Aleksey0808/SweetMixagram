
import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(60);
  const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (!isPaused && timer > 0) {
//       interval = setInterval(() => setTimer(prev => prev - 1), 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isPaused, timer]);

  const resetTimer = (time = 60) => {
    setTimer(time);
    setIsPaused(false);
  };

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);

  return (
    <TimerContext.Provider value={{ timer, setTimer, resetTimer, pauseTimer, resumeTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
