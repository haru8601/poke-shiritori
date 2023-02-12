const mysql = require("mysql2/promise");

// db情報
export const dbServer = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
};

export default function connectMysql() {
  /* クエリ実行関数 */
  const execQuery = async (query: string, values: any[]) => {
    const pool =
      process.env.NODE_ENV == "production"
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
  return { execQuery } as const;
}
