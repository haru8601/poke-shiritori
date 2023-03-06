import "server-only";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import execQuery from "@/lib/mysql/execQuery";
import fetchScoreAll from "@/lib/mysql/select";
import { Score } from "@/types/Score";
import { getFormatDate } from "@/utils/getFormatDate";

export async function POST() {
  const errorRes = NextResponse.json({ ok: false, message: "error!" });

  const API_KEY = process.env.SHIRITORI_API_KEY;
  const ACTION_KEY = headers().get("SHIRITORI_API_SECRET");
  if (!API_KEY || !ACTION_KEY || !bcrypt.compareSync(API_KEY, ACTION_KEY)) {
    console.log("auth error.");
    return errorRes;
  }
  let tmpScores: Score[] = [];
  try {
    tmpScores = JSON.parse(
      fs
        .readFileSync(path.join(process.cwd(), "lib", "scoreAll.json"))
        .toString()
    );
  } catch (err) {
    console.log(`error while parse scoreAll.json`);
    console.log(err);
    return errorRes;
  }
  const exScores = await fetchScoreAll();

  // 既存スコアがファイル内に存在するかチェック
  let existFlg = true;
  exScores.forEach((exScore) => {
    if (
      !tmpScores.find(
        (tmpScore) =>
          tmpScore.id && tmpScore.id >= 0 && tmpScore.id == exScore.id
      )
    ) {
      console.log("a exscore not found.");
      console.log("exScore:");
      console.log(exScore);
      existFlg = false;
    }
  });
  if (!existFlg) {
    return errorRes;
  }
  const newScores: Score[] = tmpScores.filter(
    (tmpScore) => !tmpScore.id || tmpScore.id < 0
  );
  if (!newScores.length) {
    console.log("no new record.");
    return NextResponse.json({ ok: true, message: "no record." });
  }
  let insertSql =
    "insert into score_all (user, score, create_date, update_date) values ";
  newScores.forEach((newScore, index) => {
    insertSql += `('${newScore.user}', ${newScore.score}, ${
      newScore.create_date ? `'${getFormatDate(newScore.create_date)}'` : null
    }, ${
      newScore.update_date ? `'${getFormatDate(newScore.update_date)}'` : null
    })${index == newScores.length - 1 ? ";" : ", "}`;
  });
  await execQuery(insertSql)
    .then((response) => {
      if (!response) {
        console.log("error while execQuery.");
      } else {
        console.log("inserted new scores!");
      }
    })
    .catch((err) => {
      console.log("cron insert error.");
      console.log(err);
      return errorRes;
    });

  /* ファイル側更新 */
  const scoreAll = await fetchScoreAll();
  fs.writeFileSync(
    path.join(process.cwd(), "lib", "scoreAll.json"),
    JSON.stringify(scoreAll, undefined, 2)
  );
  return NextResponse.json({ ok: true });
}
