"use server";

import { headers } from "next/headers";
import { CONFIG } from "@/const/config";
import storeDbScore from "@/lib/mysql/insert";
import { getCurrentVersion } from "@/utils/getCurrentVersion";

/**
 * ランキング保存
 * ニックネームがundefinedの場合はデフォルト値が使用される
 * @param nickname ニックネーム
 * @param score スコア
 * @returns true: 保存成功, false: 保存失敗
 */
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

  const version = getCurrentVersion() || "unknown";

  const res = await storeDbScore(nickname, score, clientIp, version);
  if (!res) {
    console.error("Failed to store to db");
    return false;
  }

  return true;
}
