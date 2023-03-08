import "server-only";
import { NextResponse } from "next/server";
import fetchDbScoreAll from "@/lib/mysql/select";

export async function GET(): Promise<NextResponse> {
  const dbScoreAll = await fetchDbScoreAll();
  return NextResponse.json(dbScoreAll);
}
