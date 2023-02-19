import { ResultSetHeader } from "mysql2";
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [rows, fileds] = await conn.execute(query, values);
      await conn.commit();
      return rows;
    } catch (err) {
      await conn.rollback();
      console.log("error while executing query");
      console.log(err);
    } finally {
      await conn.end();
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
    return await execQuery("insert into score_all(user, score) values(?, ?)", [
      nickname,
      score,
    ])
      .then((response: ResultSetHeader) => response)
      .catch((err) => {
        console.log("insert error");
        console.log(err);
      });
  };

  return { fetchScoreAll, storeScore } as const;
}
