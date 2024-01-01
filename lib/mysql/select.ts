import "server-only";
import { Dayjs } from "dayjs";
import execQuery from "@/lib/mysql/execQuery";
import { Score } from "@/types/Score";

export default async function fetchDbScoreAll(
  beforeDate?: Dayjs,
  afterDate?: Dayjs
): Promise<Score[]> {
  const format = "YYYY-MM-DD 00:00:00";

  // where create_date < 2023-01-01 00:00:00
  const beforeText = beforeDate
    ? ` where create_date < "${beforeDate.format(format)}" `
    : " ";

  const operator = beforeDate ? " and " : " where ";
  // and create_date < 2023-01-01 00:00:00
  const afterText = afterDate
    ? `${operator}create_date >= "${afterDate.format(format)}" `
    : " ";

  return await execQuery(
    `select * from score_all
    ${beforeText}
    ${afterText}
    order by score desc, update_date desc`
  ).catch((err: Error) => {
    console.log("select error");
    console.log(err);
    return [];
  });
}
