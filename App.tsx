import React, { useState, useCallback, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { LEVELS } from './constants';
import type { Level } from './types';

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    try {
      const savedLevelIndex = localStorage.getItem('solitaryBlue_levelIndex');
      if (savedLevelIndex) {
        const parsedIndex = parseInt(savedLevelIndex, 10);
        if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < LEVELS.length) {
          return parsedIndex;
        }
      }
    } catch (error) {
      console.error("Failed to read level index from localStorage", error);
    }
    return 0;
  });
  
  const [winStreak, setWinStreak] = useState(() => {
    try {
      const savedWinStreak = localStorage.getItem('solitaryBlue_winStreak');
      if (savedWinStreak) {
        const parsedStreak = parseInt(savedWinStreak, 10);
        if (!isNaN(parsedStreak) && parsedStreak >= 0) {
          return parsedStreak;
        }
      }
    } catch (error) {
      console.error("Failed to read win streak from localStorage", error);
    }
    return 0;
  });

  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON'>('PLAYING');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('solitaryBlue_levelIndex', currentLevelIndex.toString());
    } catch (error) {
      console.error("Failed to save level index to localStorage", error);
    }
  }, [currentLevelIndex]);

  useEffect(() => {
    try {
      localStorage.setItem('solitaryBlue_winStreak', winStreak.toString());
    } catch (error) {
      console.error("Failed to save win streak to localStorage", error);
    }
  }, [winStreak]);

  const currentLevel: Level = LEVELS[currentLevelIndex];

  const handleWin = useCallback(() => {
    setGameStatus('WON');
    setWinStreak(prev => prev + 1);
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
    setWinStreak(0);
  };

  const handleLevelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(event.target.value, 10);
    setCurrentLevelIndex(newIndex);
    setGameStatus('PLAYING');
    setResetKey(prev => prev + 1);
    setWinStreak(0);
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

      <footer className="mt-6 flex items-center gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-2 border border-slate-600 text-slate-400 rounded-md hover:bg-slate-800 hover:text-white transition-colors duration-300"
        >
          Reset
        </button>
        <div>
          <label htmlFor="level-select" className="sr-only">Select Level</label>
          <select
            id="level-select"
            value={currentLevelIndex}
            onChange={handleLevelSelect}
            className="bg-slate-800 border border-slate-600 text-slate-400 rounded-md px-3 py-2 hover:bg-slate-700 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
          >
            {LEVELS.map((level, index) => (
              <option key={level.id} value={index} className="bg-slate-800 text-slate-300">
                Level {level.id}
              </option>
            ))}
          </select>
        </div>
        <div className="pl-4 border-l border-slate-700 text-center">
            <div className="text-cyan-400 font-mono text-2xl font-semibold">{winStreak}</div>
            <div className="text-slate-500 text-xs tracking-widest">STREAK</div>
        </div>
      </footer>
    </div>
  );
};

export default App;