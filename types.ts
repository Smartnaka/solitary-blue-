export enum TileType {
  EMPTY,
  START,
  END,
  OBSTACLE,
  PATH,
}

export interface Position {
  row: number;
  col: number;
}

export type Grid = TileType[][];

export interface Level {
  id: number;
  grid: Grid;
  start: Position;
  end: Position;
}
