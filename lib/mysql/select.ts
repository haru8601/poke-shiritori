import "server-only";
import { Dayjs } from "dayjs";
import execQuery from "@/lib/mysql/execQuery";
import { Score } from "@/types/Score";

export default async function fetchDbScoreAll(
  beforeDate?: Dayjs,
  afterDate?: Dayjs,
  limit?: number,
  majorVersion?: string
): Promise<Score[]> {
  const format = "YYYY-MM-DD 00:00:00";

  // ex) where create_date < 2023-01-01 00:00:00
  const beforeText = beforeDate
    ? ` where create_date < "${beforeDate.format(format)}" `
    : " ";

  const operator = beforeDate ? " and " : " where ";
  // ex) and create_date < 2023-01-01 00:00:00
  const afterText = afterDate
    ? `${operator}create_date >= "${afterDate.format(format)}" `
    : " ";

  const versionOperator = beforeDate || afterDate ? " and " : " where ";

  const versionText = majorVersion
    ? `${versionOperator}version like "${majorVersion}.%.%"`
    : " ";

  const limitText = limit ? ` limit ${limit}` : "";

  // TODO:monthと総合もクエリを分けてlimitかけれるようにする
  // TODO: where, orderのカラムに複合indexを貼って試す
  return await execQuery(
    `select * from score_all
    ${beforeText}
    ${afterText}
    ${versionText}
    order by score desc, create_date desc
    ${limitText}
    `
  ).catch((err: Error) => {
    console.log("select error");
    console.log(err);
    return [];
  });
}
