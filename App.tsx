import React, { useState, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { LEVELS } from './constants';
import type { Level } from './types';

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON'>('PLAYING');
  const [resetKey, setResetKey] = useState(0);

  const currentLevel: Level = LEVELS[currentLevelIndex];

  const handleWin = useCallback(() => {
    setGameStatus('WON');
  }, []);

  const handleNextLevel = () => {
    const nextIndex = (currentLevelIndex + 1) % LEVELS.length;
    setCurrentLevelIndex(nextIndex);
    setGameStatus('PLAYING');
    setResetKey(prev => prev + 1);
  };

  const handleReset = () => {
    setGameStatus('PLAYING');
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-thin tracking-widest text-blue-300">
          SOLITARY BLUE
        </h1>
        <p className="text-slate-400 mt-2">Level {currentLevel.id}</p>
      </header>

      <main className="relative">
        <GameBoard
          key={resetKey}
          level={currentLevel}
          onWin={handleWin}
          isWon={gameStatus === 'WON'}
        />
        {gameStatus === 'WON' && <GameStatus onNextLevel={handleNextLevel} isLastLevel={currentLevelIndex === LEVELS.length - 1} />}
      </main>

      <footer className="mt-6">
        <button
          onClick={handleReset}
          className="px-6 py-2 border border-slate-600 text-slate-400 rounded-md hover:bg-slate-800 hover:text-white transition-colors duration-300"
        >
          Reset
        </button>
      </footer>
    </div>
  );
};

export default App;
