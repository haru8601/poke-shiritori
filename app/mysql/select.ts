import execQuery from "./execQuery";

export default async function fetchScoreAll() {
  return await execQuery(
    "select user,score from score_all order by score desc, update_date desc",
    []
  ).catch((err: Error) => {
    console.log("select error");
    console.log(err);
    return [];
  });
}
