"use server";

import { headers } from "next/headers";
import { CONFIG } from "@/const/config";
import storeDbScore from "@/lib/mysql/insert";

export default async function setRanking(
  nickname: string = CONFIG.score.defaultNickname,
  score: number
): Promise<boolean> {
  if (
    nickname.length > CONFIG.score.nicknameMaxLen ||
    isNaN(score) ||
    score > CONFIG.score.scoreMax
  ) {
    console.error("bad request");
    console.error(`nickname:${nickname}, score:${score}`);
    return false;
  }

  const clientIp = headers().get("x-forwarded-for") || "IP_NOT_FOUND";

  const res = await storeDbScore(nickname, score, clientIp);
  if (!res) {
    console.error("Failed to store to db");
    return false;
  }

  return true;
}
