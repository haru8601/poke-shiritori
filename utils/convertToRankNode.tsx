import styles from "@/app/styles/Top.module.css";
import { dummyScores } from "@/const/dummyScores";
import { Score } from "@/types/Score";

/**
 * スコアをテーブルのNodeに変換する
 * @param scoreAll 全スコア
 * @returns テーブルNode
 */
export const convertToRankNode = (scoreAll: Score[], hasDummy: boolean) => {
  return scoreAll.map((score: Score, index) => {
    let rankNum: number = index + 1;
    let rankStr: string = rankNum.toString();
    if (hasDummy) {
      // ダミースコア分indexがずれるので修正
      for (let dummyScore of dummyScores) {
        if (score.score < dummyScore.score) {
          rankNum--;
        }
      }
      rankStr = rankNum.toString();
      // ダミースコアはランキングなし
      if (score.id == undefined) {
        rankStr = "-";
      }
    }
    return (
      <tr
        key={index}
        className={score.id == undefined ? styles.dummyScore : ""}
      >
        <td>{rankStr}</td>
        <td>{score.user}</td>
        <td>{score.score}</td>
      </tr>
    );
  });
};
