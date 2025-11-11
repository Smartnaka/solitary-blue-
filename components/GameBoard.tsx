import React, { useState, useEffect, useCallback } from 'react';
import { Tile } from './Tile';
import type { Grid, Level, Position } from '../types';
import { TileType } from '../types';

interface GameBoardProps {
  level: Level;
  onWin: () => void;
  isWon: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ level, onWin, isWon }) => {
  const [grid, setGrid] = useState<Grid>(level.grid);
  const [path, setPath] = useState<Position[]>([]);

  useEffect(() => {
    const newGrid = level.grid.map(row => [...row]);
    
    path.forEach(pos => {
      newGrid[pos.row][pos.col] = TileType.PATH;
    });

    setGrid(newGrid);

    if (path.length > 0) {
      const lastPos = path[path.length - 1];
      const endPos = level.end;
      const isAdjacentToEnd =
        (Math.abs(lastPos.row - endPos.row) === 1 && lastPos.col === endPos.col) ||
        (Math.abs(lastPos.col - endPos.col) === 1 && lastPos.row === endPos.row);

      if (isAdjacentToEnd) {
        onWin();
      }
    }
  }, [path, level, onWin]);

  const handleTileClick = useCallback((row: number, col: number) => {
    if (isWon) return;

    const tileType = level.grid[row][col];
    if (tileType === TileType.OBSTACLE || tileType === TileType.START || tileType === TileType.END) {
      return;
    }

    const clickedPos = { row, col };
    const pathIndex = path.findIndex(p => p.row === row && p.col === col);

    if (pathIndex !== -1) {
      // Clicked on an existing path tile, remove it and subsequent tiles
      setPath(currentPath => currentPath.slice(0, pathIndex));
    } else {
      // Clicked on an empty tile, try to add it
      const lastPos = path.length > 0 ? path[path.length - 1] : level.start;
      const isAdjacent =
        (Math.abs(clickedPos.row - lastPos.row) === 1 && clickedPos.col === lastPos.col) ||
        (Math.abs(clickedPos.col - lastPos.col) === 1 && clickedPos.row === lastPos.row);

      if (isAdjacent) {
        setPath(currentPath => [...currentPath, clickedPos]);
      }
    }
  }, [isWon, level.grid, level.start, path]);

  return (
    <div
      className="grid gap-1 p-2 bg-slate-950/50 rounded-lg shadow-2xl shadow-blue-900/20"
      style={{ gridTemplateColumns: `repeat(${level.grid[0].length}, minmax(0, 1fr))` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((tileType, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            type={tileType}
            isWinningPath={isWon}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};
