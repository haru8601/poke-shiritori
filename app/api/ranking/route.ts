import "server-only";
import { NextRequest, NextResponse } from "next/server";
import fetchDbScoreAll from "@/lib/mysql/select";

// リクエストを動的にする(キャッシュさせない)
export async function GET(_request: NextRequest): Promise<NextResponse> {
  const dbScoreAll = await fetchDbScoreAll();
  return NextResponse.json(dbScoreAll);
}
