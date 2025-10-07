
import React from 'react';

interface WinScreenProps {
  time: number;
  onPlayAgain: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ time, onPlayAgain }) => {
  const getRanking = (seconds: number): string => {
    if (seconds < 60) {
      return "Gia đình siêu trí tuệ";
    }
    if (seconds < 120) {
      return "Gia đình thông thái";
    }
    return "Gia đình phát triển";
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">CHÚC MỪNG!</h1>
      <p className="text-xl text-gray-300 mb-2">Bạn đã giải được ô chữ bí mật!</p>
      <p className="text-2xl font-semibold text-white mb-6">
        Thời gian hoàn thành: <span className="text-green-400">{formatTime(time)}</span>
      </p>
      <div className="bg-indigo-600 text-white text-2xl font-bold py-3 px-8 rounded-lg mb-8 shadow-lg">
        {getRanking(time)}
      </div>
      <button
        onClick={onPlayAgain}
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-xl transition-all duration-300 transform hover:scale-105"
      >
        Chơi lại
      </button>
    </div>
  );
};

export default WinScreen;
