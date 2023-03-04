import "server-only";
import execQuery from "@/lib/mysql/execQuery";
import { Score } from "@/types/Score";

export default async function fetchScoreAll(): Promise<Score[]> {
  return await execQuery(
    "select * from score_all order by score desc, update_date desc",
    []
  ).catch((err: Error) => {
    console.log("select error");
    console.log(err);
    return [];
  });
}
