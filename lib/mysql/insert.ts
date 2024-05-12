import { ResultSetHeader } from "mysql2";
import { CONFIG } from "@/const/config";
import execQuery from "@/lib/mysql/execQuery";

/**
 * スコア保存
 * @param nickname ニックネーム
 * @param score スコア
 * @param clientIp クライアントIP
 * @param version バージョン
 */
export default async function storeDbScore(
  nickname: string,
  score: number,
  clientIp: string,
  version: string
): Promise<ResultSetHeader | void> {
  if (nickname.length > CONFIG.score.nicknameMaxLen) {
    console.log("too long nickname.");
    return;
  }
  if (Number.isNaN(score)) {
    console.log("score is NOT a number.");
    return;
  }
  return await execQuery(
    "insert into score_all(user, score, ip, version) values(?, ?, ?, ?)",
    [nickname, score, clientIp, version]
  ).catch((err: Error) => {
    console.log("insert error");
    console.log(err);
  });
}
