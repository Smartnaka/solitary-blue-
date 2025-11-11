import React from 'react';
import { TileType } from '../types';

interface TileProps {
  type: TileType;
  onClick: () => void;
  isWinningPath: boolean;
}

const tileColorMap: Record<TileType, string> = {
  [TileType.EMPTY]: 'bg-slate-800 hover:bg-slate-700',
  [TileType.START]: 'bg-cyan-500',
  [TileType.END]: 'bg-indigo-500',
  [TileType.OBSTACLE]: 'bg-slate-900 cursor-not-allowed',
  [TileType.PATH]: 'bg-blue-500',
};

export const Tile: React.FC<TileProps> = ({ type, onClick, isWinningPath }) => {
  const baseClasses = 'w-10 h-10 md:w-12 md:h-12 rounded-md transition-colors duration-300 ease-in-out';
  const colorClasses = tileColorMap[type];
  
  const winningPathAnimation = isWinningPath && (type === TileType.PATH || type === TileType.START || type === TileType.END)
    ? 'animate-pulse'
    : '';

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${winningPathAnimation}`}
      onClick={onClick}
    />
  );
};
