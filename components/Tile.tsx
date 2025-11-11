import React from 'react';
import { TileType } from '../types';

interface TileProps {
  type: TileType;
  onClick: () => void;
  isWinningPath: boolean;
}

const tileStyleMap: Record<TileType, string> = {
  [TileType.EMPTY]: 'bg-slate-800 hover:bg-slate-700 cursor-pointer active:scale-95',
  [TileType.START]: 'bg-cyan-500 cursor-default',
  [TileType.END]: 'bg-indigo-500 cursor-default',
  [TileType.OBSTACLE]: 'bg-slate-900 cursor-not-allowed',
  [TileType.PATH]: 'bg-blue-500 cursor-pointer active:scale-95',
};

export const Tile: React.FC<TileProps> = ({ type, onClick, isWinningPath }) => {
  const baseClasses = 'w-10 h-10 md:w-12 md:h-12 rounded-md transition-all duration-200 ease-in-out';
  const styleClasses = tileStyleMap[type];
  
  const winningPathAnimation = isWinningPath && (type === TileType.PATH || type === TileType.START || type === TileType.END)
    ? 'animate-pulse'
    : '';

  return (
    <div
      className={`${baseClasses} ${styleClasses} ${winningPathAnimation}`}
      onClick={onClick}
    />
  );
};
