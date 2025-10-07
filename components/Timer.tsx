
import React from 'react';

interface TimerProps {
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-blue-900/40 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 text-white font-mono text-2xl px-4 py-2 rounded-lg">
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;