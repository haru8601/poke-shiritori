export const GAME_STATUS = {
  beforeStart: "before_start",
  willStart: "will_start",
  playingMyturn: "playing_myturn",
  playingWillEnermy: "playing_will_enermy",
  playingEnermy: "playing_enermy",
  endWin: "end_win",
  endLose: "end_lose",
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
