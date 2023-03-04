import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "@/const/config";
import { pushScores } from "@/lib/scoreAll";

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
  const nowDate = new Date();
  pushScores([
    {
      id: -1,
      user: nickname || CONFIG.score.defaultNickname,
      score: parseInt(score, 10),
      create_date: nowDate,
      update_date: nowDate,
    },
  ]);
  return NextResponse.json({ ok: true });
}
