import { dummyScores } from "@/const/dummyScores";

export const getRankText = (score: number): string => {
  let rank = "ランクなし";
  // 降順
  const sortedDummyScores = dummyScores.sort((a, b) => {
    return b.score - a.score;
  });
  // 上のランクから確認
  for (const dummyScore of sortedDummyScores) {
    if (score >= dummyScore.score) {
      return dummyScore.user;
    }
  }
  return rank;
};
