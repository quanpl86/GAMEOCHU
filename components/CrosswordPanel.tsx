import React from 'react';
import { Question } from '../types';
import Timer from './Timer';

interface CrosswordPanelProps {
  gameData: Question[];
  revealedWords: boolean[];
  gameTime: number;
}

const CrosswordPanel: React.FC<CrosswordPanelProps> = ({ gameData, revealedWords, gameTime }) => {
  const maxLength = Math.max(...gameData.map(q => q.horizontalWords.length));

  return (
    <div className="bg-blue-900/40 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 p-4 md:p-6 rounded-2xl flex flex-col gap-4 h-full">
      <div className="flex justify-end">
        <Timer seconds={gameTime} />
      </div>
      <div className="grid gap-1.5 flex-grow" style={{ gridTemplateRows: `repeat(${gameData.length}, minmax(0, 1fr))` }}>
        {gameData.map((data, rowIndex) => (
          <div key={rowIndex} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${maxLength}, minmax(0, 1fr))`}}>
            {Array.from({ length: maxLength }).map((_, colIndex) => {
              const word = data.horizontalWords[colIndex] || '';
              const isSecretKeyCell = colIndex === data.secretWordIndex;
              const isRevealed = revealedWords[rowIndex];
              
              const cellClasses = `
                w-full h-10 md:h-14 flex items-center justify-center text-center text-[10px] md:text-base font-bold uppercase rounded-md p-1
                transition-all duration-500
                ${isRevealed ? 'text-white' : 'text-transparent'}
                ${isSecretKeyCell 
                  ? 'bg-orange-500' 
                  : word ? 'bg-blue-900' : 'bg-transparent'}
              `;

              return (
                <div key={colIndex} className={cellClasses}>
                    {word}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrosswordPanel;