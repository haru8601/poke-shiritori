import "server-only";
import { NextResponse } from "next/server";
import fetchScoreAll from "@/lib/mysql/select";
import { getScoreAll, pushScores } from "../../../lib/scoreAll";

export async function GET(): Promise<NextResponse> {
  let scoreAll = getScoreAll();
  if (!scoreAll.length) {
    /* データがなければDBから取得 */
    const dbScoreAll = await fetchScoreAll();
    /* ファイルにpush */
    pushScores(dbScoreAll);
    scoreAll = dbScoreAll;
  }
  return NextResponse.json(scoreAll);
}
