import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CONFIG } from "@/const/config";
import { CookieNames } from "@/const/cookieNames";
import storeDbScore from "@/lib/mysql/insert";
import fetchDbScoreAll from "@/lib/mysql/select";

export async function GET(): Promise<NextResponse> {
  const dbScoreAll = await fetchDbScoreAll();
  return NextResponse.json(dbScoreAll);
}

export async function POST(): Promise<NextResponse> {
  // キャッシュを使わせないためcookieを使用
  const nickname = cookies().get(CookieNames.shiritori_nickname)?.value;
  const score = cookies().get(CookieNames.shiritori_score)?.value;

  if (
    !nickname ||
    !score ||
    nickname.length > CONFIG.score.nicknameMaxLen ||
    isNaN(Number(score)) ||
    parseInt(score) > CONFIG.score.scoreMax
  ) {
    console.log("bad request");
    console.log(`nickname:${nickname}, score:${score}`);
    return NextResponse.json(
      { ok: false, message: "Bad Request" },
      { status: 400 }
    );
  }
  const res = await storeDbScore(
    nickname || CONFIG.score.defaultNickname,
    parseInt(score, 10)
  );
  if (!res) {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to store to db",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
