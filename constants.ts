import { Level, TileType } from './types';

const { EMPTY, START, END, OBSTACLE } = TileType;

export const LEVELS: Level[] = [
  {
    id: 1,
    start: { row: 2, col: 0 },
    end: { row: 2, col: 4 },
    grid: [
      [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      [START, EMPTY, EMPTY, EMPTY, END],
      [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    ],
  },
  {
    id: 2,
    start: { row: 0, col: 0 },
    end: { row: 4, col: 4 },
    grid: [
      [START, OBSTACLE, EMPTY, EMPTY, EMPTY],
      [EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY],
      [EMPTY, EMPTY, EMPTY, OBSTACLE, EMPTY],
      [EMPTY, OBSTACLE, EMPTY, EMPTY, EMPTY],
      [EMPTY, OBSTACLE, EMPTY, OBSTACLE, END],
    ],
  },
  {
    id: 3,
    start: { row: 3, col: 0 },
    end: { row: 3, col: 6 },
    grid: [
      [EMPTY, EMPTY, EMPTY, OBSTACLE, EMPTY, EMPTY, EMPTY],
      [EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY],
      [EMPTY, OBSTACLE, EMPTY, EMPTY, EMPTY, OBSTACLE, EMPTY],
      [START, EMPTY, EMPTY, OBSTACLE, EMPTY, EMPTY, END],
      [EMPTY, OBSTACLE, EMPTY, EMPTY, EMPTY, OBSTACLE, EMPTY],
      [EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY],
      [EMPTY, EMPTY, EMPTY, OBSTACLE, EMPTY, EMPTY, EMPTY],
    ],
  },
  {
    id: 4,
    start: { row: 6, col: 3 },
    end: { row: 0, col: 3 },
    grid: [
      [OBSTACLE, OBSTACLE, OBSTACLE, END, OBSTACLE, OBSTACLE, OBSTACLE],
      [OBSTACLE, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, OBSTACLE],
      [OBSTACLE, EMPTY, OBSTACLE, OBSTACLE, OBSTACLE, EMPTY, OBSTACLE],
      [OBSTACLE, EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY, OBSTACLE],
      [OBSTACLE, EMPTY, OBSTACLE, EMPTY, OBSTACLE, EMPTY, OBSTACLE],
      [OBSTACLE, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, OBSTACLE],
      [OBSTACLE, OBSTACLE, OBSTACLE, START, OBSTACLE, OBSTACLE, OBSTACLE],
    ]
  }
];
