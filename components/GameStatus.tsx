import React from 'react';

interface GameStatusProps {
  onNextLevel: () => void;
  isLastLevel: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ onNextLevel, isLastLevel }) => {
  return (
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg animate-fade-in">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-cyan-300 mb-4">
          {isLastLevel ? 'Complete' : 'Solved'}
        </h2>
        <p className="text-slate-300 mb-6">
          {isLastLevel ? 'You have solved all the puzzles.' : 'The path is complete.'}
        </p>
        <button
          onClick={onNextLevel}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 hover:bg-blue-500 transform hover:scale-105 transition-all duration-300"
        >
          {isLastLevel ? 'Play Again' : 'Next Level'}
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
