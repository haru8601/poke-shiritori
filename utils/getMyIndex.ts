import { Score } from "@/types/Score";

/**
 * 自分の順位算出(0スタート)
 * @param {number} score 自分のスコア
 * @param {Score[]} scoreAll 全スコア
 * @returns 自分の順位
 */
export const getMyIndex = (score: number, scoreAll: Score[]): number => {
  const tmpRank = scoreAll.findIndex((row) => row.score <= score);
  return tmpRank != -1 ? tmpRank : scoreAll.length;
};
