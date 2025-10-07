
import React, { useState, useEffect } from 'react';

interface SolveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (attempt: string) => void;
}

const SolveModal: React.FC<SolveModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [attempt, setAttempt] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAttempt('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(attempt.trim()){
      onSubmit(attempt);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 w-full max-w-md transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-400">Nhập từ khóa bí mật</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-4 text-white text-xl text-center uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Giải đố
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolveModal;
