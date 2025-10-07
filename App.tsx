import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Question } from './types';
import { QUESTIONS_BANK } from './constants';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import SolveModal from './components/SolveModal';

// Utility function to shuffle an array
const shuffleArray = (array: Question[]): Question[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Header = () => (
  <header className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl text-center py-6 z-10">
    <img src="/logo.png" alt="Edison STEM Academy Logo" className="h-12 mx-auto mb-4"/>
    <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider" style={{ textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff' }}>
      <span className="text-cyan-300">AI</span> THỬ THÁCH THÔNG MINH
    </h1>
    <h2 className="text-2xl md:text-3xl text-white font-semibold mt-2">
      Gia Đình Siêu Trí Tuệ
    </h2>
  </header>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedWords, setRevealedWords] = useState<boolean[]>(Array(QUESTIONS_BANK.length).fill(false));
  const [gameTime, setGameTime] = useState(0);
  const [isSolveModalOpen, setIsSolveModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'incorrect' | null>>({});

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [secretKeyword, setSecretKeyword] = useState('');

  const resetGame = useCallback(() => {
    // Add originalIndex to each question and then shuffle
    const questionsToShuffle = QUESTIONS_BANK.map((q, index) => ({ ...q, originalIndex: index }));
    setShuffledQuestions(shuffleArray(questionsToShuffle));

    // Derive the secret keyword from the original, ordered data source
    const keyword = QUESTIONS_BANK.map(
      item => item.horizontalWords[item.secretWordIndex]
    ).join(' ').trim();
    setSecretKeyword(keyword);

    setGameState(GameState.PLAYING);
    setCurrentQuestionIndex(0);
    setRevealedWords(Array(QUESTIONS_BANK.length).fill(false));
    setGameTime(0);
    setIsSolveModalOpen(false);
    setFeedback({});
  }, []);

  // Initialize game on first load
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      const timer = setInterval(() => {
        setGameTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleAnswer = (choiceIndex: number) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (currentQuestion?.originalIndex === undefined) return;

    if (choiceIndex === currentQuestion.correctChoiceIndex) {
      setFeedback(prev => ({ ...prev, [choiceIndex]: 'correct' }));
      setTimeout(() => {
        const newRevealedWords = [...revealedWords];
        // Use originalIndex to reveal the correct row in the crossword grid
        newRevealedWords[currentQuestion.originalIndex!] = true;
        setRevealedWords(newRevealedWords);
        
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setCurrentQuestionIndex(shuffledQuestions.length);
        }
        setFeedback({});
      }, 500);
    } else {
      setFeedback(prev => ({ ...prev, [choiceIndex]: 'incorrect' }));
      setTimeout(() => setFeedback(prev => ({ ...prev, [choiceIndex]: null })), 500);
    }
  };

  const handleSolveAttempt = (attempt: string) => {
    if (attempt.trim().toUpperCase() === secretKeyword.toUpperCase()) {
      setGameState(GameState.WON);
    } else {
      alert("Sai rồi! Hãy thử lại.");
    }
    setIsSolveModalOpen(false);
  };
  
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const allQuestionsAnswered = currentQuestionIndex >= shuffledQuestions.length;

  return (
    <div className="text-white min-h-screen flex flex-col justify-center p-4 sm:p-6 md:p-8 relative pt-48">
      <Header />
      {gameState === GameState.PLAYING && (
        <GameScreen
          currentQuestion={currentQuestion}
          crosswordData={QUESTIONS_BANK as Question[]}
          revealedWords={revealedWords}
          questionNumber={currentQuestionIndex + 1}
          isFinished={allQuestionsAnswered}
          onAnswer={handleAnswer}
          onSolveClick={() => setIsSolveModalOpen(true)}
          gameTime={gameTime}
          feedback={feedback}
        />
      )}
      {gameState === GameState.WON && (
        <WinScreen time={gameTime} onPlayAgain={resetGame} />
      )}
      <SolveModal 
        isOpen={isSolveModalOpen}
        onClose={() => setIsSolveModalOpen(false)}
        onSubmit={handleSolveAttempt}
      />
    </div>
  );
};

export default App;