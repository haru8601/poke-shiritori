import { ResultSetHeader } from "mysql2";
import execQuery from "@/lib/mysql/execQuery";

/**
 * スコア保存
 * @param nickname ニックネーム
 * @param score スコア
 */
export default async function storeScore(
  nickname: string,
  score: string
): Promise<ResultSetHeader | void> {
  if (nickname.length > 10) {
    console.log("too long nickname.");
    return;
  }
  if (Number.isNaN(score)) {
    console.log("score is NOT a number.");
    return;
  }
  return await execQuery("insert into score_all(user, score) values(?, ?)", [
    nickname,
    score,
  ]).catch((err: Error) => {
    console.log("insert error");
    console.log(err);
  });
}
