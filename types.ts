// FIX: Removed self-referential import of `GameState`.
export enum GameState {
  PLAYING,
  WON,
}

export interface Question {
  question: string;
  choices: string[];
  correctChoiceIndex: number;
  horizontalWords: string[];
  secretWordIndex: number;
  originalIndex?: number;
}
