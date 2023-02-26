import mysql from "mysql2/promise";
import { dbServer } from "@/const/dbConfig";
import { SSHConnection } from "@/lib/sshConnection";

export default async function execQuery(query: string, values: any[]) {
  const pool: mysql.Pool | undefined =
    process.env.SSH_HOST !== undefined
      ? await SSHConnection()
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
}
