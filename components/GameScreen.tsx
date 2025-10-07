import React from 'react';
import { Question } from '../types';
import QuestionPanel from './QuestionPanel';
import CrosswordPanel from './CrosswordPanel';

interface GameScreenProps {
  currentQuestion?: Question;
  crosswordData: Question[];
  revealedWords: boolean[];
  questionNumber: number;
  isFinished: boolean;
  onAnswer: (choiceIndex: number) => void;
  onSolveClick: () => void;
  gameTime: number;
  feedback: Record<number, 'correct' | 'incorrect' | null>;
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentQuestion,
  crosswordData,
  revealedWords,
  questionNumber,
  isFinished,
  onAnswer,
  onSolveClick,
  gameTime,
  feedback
}) => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <QuestionPanel
        questionData={currentQuestion}
        onAnswer={onAnswer}
        isFinished={isFinished}
        questionNumber={questionNumber}
        feedback={feedback}
        onSolveClick={onSolveClick}
      />
      <CrosswordPanel
        gameData={crosswordData}
        revealedWords={revealedWords}
        gameTime={gameTime}
      />
    </main>
  );
};

export default GameScreen;