import { dummyScores } from "@/const/dummyScores";
import { Score } from "@/types/Score";

/**
 * ダミーデータを追加した配列を返す
 * @param {Score[]} scoreAll 全スコア
 * @returns ダミーデータ追加後の全スコア
 */
export const addDummy = (scoreAll: Score[]) => {
  // ディープコピー
  const tmpScoreAll = JSON.parse(JSON.stringify(scoreAll)) as Score[];
  tmpScoreAll.push(...dummyScores);
  // ダミーデータを追加後に再ソート
  tmpScoreAll.sort((a, b) => {
    const scoreDiff = a.score - b.score;
    if (scoreDiff != 0) {
      // 降順
      return -1 * scoreDiff;
    }
    // 更新日時はundefinedではない想定
    if (a.update_date && b.update_date) {
      // booleanをnumberに変換
      // 降順
      return Number(a.update_date < b.update_date);
    }
    return -1;
  });
  return tmpScoreAll;
};
