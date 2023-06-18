import "server-only";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES } from "@/const/cookie";
import storeDbScore from "@/lib/mysql/insert";
import fetchDbScoreAll from "@/lib/mysql/select";

export async function GET(): Promise<NextResponse> {
  const dbScoreAll = await fetchDbScoreAll();
  return NextResponse.json(dbScoreAll);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // キャッシュを使わせないためcookieを使用
  const nickname =
    cookies().get(COOKIE_NAMES.nickname)?.value || CONFIG.score.defaultNickname;
  const score = cookies().get(COOKIE_NAMES.score)?.value;

  if (
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

  const clientIp = req.headers.get("x-forwarded-for") || "IP_NOT_FOUND";

  const res = await storeDbScore(
    nickname || CONFIG.score.defaultNickname,
    parseInt(score, 10),
    clientIp
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
