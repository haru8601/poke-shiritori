import { ResultSetHeader } from "mysql2";
import mysql from "mysql2/promise";
import { dbServer } from "@/const/dbConfig";
import { Score } from "@/types/Score";

export default function mysqlUtils() {
  /* クエリ実行関数 */
  const execQuery = async (query: string, values: any[]): Promise<any> => {
    const pool: mysql.Pool =
      process.env.SSH_HOST !== undefined
        ? await require("./sshConnection").SSHConnection()
        : mysql.createPool(dbServer);
    if (!pool) return;
    // 接続
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [rows, fileds] = await conn.execute(query, values);
      await conn.commit();
      return rows;
    } catch (err) {
      await conn.rollback();
      console.log("error while executing query");
      console.log(err);
    } finally {
      conn.release();
    }
  };

  /**
   * スコア全件取得
   * @returns スコア
   */
  const fetchScoreAll = async (): Promise<Score[]> => {
    return await execQuery(
      "select user,score from score_all order by score desc, update_date desc",
      []
    ).catch((err) => {
      console.log("select error");
      console.log(err);
      return [];
    });
  };

  /**
   * スコア保存
   * @param nickname ニックネーム
   * @param score スコア
   */
  const storeScore = async (
    nickname: string,
    score: string
  ): Promise<ResultSetHeader | void> => {
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
    ]).catch((err) => {
      console.log("insert error");
      console.log(err);
    });
  };

  return { fetchScoreAll, storeScore } as const;
}
