// db情報
export const dbServer = {
  host: process.env.MYSQL_HOST ?? "",
  database: process.env.MYSQL_DATABASE ?? "",
  user: process.env.MYSQL_USER ?? "",
  password: process.env.MYSQL_PASSWORD ?? "",
  port: parseInt(process.env.MYSQL_PORT ?? "0"),
};
