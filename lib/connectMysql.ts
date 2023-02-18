import mysql from "mysql2/promise";
import { Score } from "@/types/Score";

// db情報
export const dbServer = {
  host: process.env.MYSQL_HOST ?? "",
  database: process.env.MYSQL_DATABASE ?? "",
  user: process.env.MYSQL_USER ?? "",
  password: process.env.MYSQL_PASSWORD ?? "",
  port: parseInt(process.env.MYSQL_PORT ?? "0"),
};

export default function mysqlUtils() {
  /* クエリ実行関数 */
  const execQuery = async (query: string, values: any[]) => {
    const pool =
      process.env.SSH_HOST !== undefined
        ? require("./sshConnection").SSHConnection
        : mysql.createConnection(dbServer);
    // 接続
    const conn = await pool;

    try {
      await conn.beginTransaction();
      const res = await conn.execute(query, values);
      await conn.commit();
      // 0:rows, 1:fields
      return res[0];
    } catch (err) {
      await conn.rollback();
      console.log("error while executing query");
      console.log(err);
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
  const storeScore = async (nickname: string, score: string): Promise<void> => {
    await execQuery("insert into score_all(user, score) values(?, ?)", [
      nickname,
      score,
    ]).catch((err) => {
      console.log("insert error");
      console.log(err);
    });
  };

  return { fetchScoreAll, storeScore } as const;
}
