import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "@/const/config";
import storeDbScore from "@/lib/mysql/insert";

export async function POST(
  request: NextRequest,
  { params }: { params: { nickname: string; score: string } }
): Promise<NextResponse> {
  const nickname = params.nickname;
  const score = params.score;
  if (
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
