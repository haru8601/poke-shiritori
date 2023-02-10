const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
};

export default function connectMysql() {
  // 接続のプロミス
  const pool: Promise<any> = mysql.createConnection(dbConfig);

  /* クエリ実行関数 */
  const execQuery = async (query: string, values: any[]) => {
    const conn = await pool;
    try {
      await conn.beginTransaction();
      const res = await conn.execute(query, values);
      await conn.commit();

      // 0:rows, 1:fields
      return res[0];
    } catch (err) {
      await conn.rollback();
      console.log(err);
    }
  };
  return { execQuery } as const;
}