import "server-only";
import { Dayjs } from "dayjs";
import execQuery from "@/lib/mysql/execQuery";
import { Score } from "@/types/Score";

export default async function fetchDbScoreAll(
  beforeDate?: Dayjs,
  afterDate?: Dayjs,
  limit?: number
): Promise<Score[]> {
  const format = "YYYY-MM-DD 00:00:00";

  // ex) where update_date < 2023-01-01 00:00:00
  const beforeText = beforeDate
    ? ` where update_date < "${beforeDate.format(format)}" `
    : " ";

  const operator = beforeDate ? " and " : " where ";
  // ex) and update_date < 2023-01-01 00:00:00
  const afterText = afterDate
    ? `${operator}update_date >= "${afterDate.format(format)}" `
    : " ";

  const limitText = limit ? ` limit ${limit}` : "";

  // TODO:monthと総合もクエリを分けてlimitかけれるようにする
  // TODO: where, orderのカラムに複合indexを貼って試す
  return await execQuery(
    `select * from score_all
    ${beforeText}
    ${afterText}
    order by score desc, update_date desc
    ${limitText}
    `
  ).catch((err: Error) => {
    console.log("select error");
    console.log(err);
    return [];
  });
}
