import React from 'react';
import { Question } from '../types';

interface QuestionPanelProps {
  questionData?: Question;
  onAnswer: (choiceIndex: number) => void;
  isFinished: boolean;
  questionNumber: number;
  feedback: Record<number, 'correct' | 'incorrect' | null>;
  onSolveClick: () => void;
}

const ChoiceButton: React.FC<{
  label: string;
  prefix: string;
  onClick: () => void;
  disabled: boolean;
  status: 'correct' | 'incorrect' | null;
}> = ({ label, prefix, onClick, disabled, status }) => {
  const baseClasses = "w-full text-left p-4 rounded-lg transition-all duration-200 transform focus:outline-none flex items-center text-lg text-yellow-300 border";
  const enabledClasses = "bg-sky-600/20 border-sky-400/40 hover:bg-sky-600/40";
  const disabledClasses = "bg-gray-800/20 text-yellow-300/50 border-sky-400/20 cursor-not-allowed";
  
  let statusClasses = "";
  if(status === 'correct') {
    statusClasses = "bg-green-500/80 text-white animate-pulse border-green-400";
  } else if (status === 'incorrect') {
    statusClasses = "bg-red-500/80 text-white animate-shake border-red-400";
  }

  return (
    <button onClick={onClick} disabled={disabled || status !== null} className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${statusClasses}`}>
       <span className="font-bold mr-3">{prefix}.</span> {label}
    </button>
  );
};

const QuestionPanel: React.FC<QuestionPanelProps> = ({ questionData, onAnswer, isFinished, questionNumber, feedback, onSolveClick }) => {
  return (
    <div className="bg-blue-900/40 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 rounded-2xl p-6 flex flex-col h-full min-h-[50vh]">
      {isFinished ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Hoàn thành!</h2>
          <p className="text-lg text-yellow-300 mb-8">Bạn đã trả lời tất cả các câu hỏi. Bây giờ hãy tìm ra từ khóa bí mật!</p>
          <button
            onClick={onSolveClick}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg text-xl transition-all duration-300 transform hover:scale-105"
          >
            GIẢI Ô CHỮ BÍ MẬT
          </button>
        </div>
      ) : (
        questionData && (
          <div className="flex flex-col flex-grow">
            <p className="text-xl md:text-2xl font-medium mb-8 flex-grow text-yellow-300">{questionData.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questionData.choices.map((choice, index) => (
                <ChoiceButton
                    key={index}
                    label={choice}
                    prefix={String.fromCharCode(65 + index)}
                    onClick={() => onAnswer(index)}
                    disabled={isFinished}
                    status={feedback[index] ?? null}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionPanel;