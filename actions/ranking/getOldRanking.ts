"use server";

import { Score } from "@/types/Score";
import { findResetDate } from "@/utils/findResetHistory";
import { getDescHistories } from "@/utils/getDescHistories";
import fetchDbScoreAll from "../../lib/mysql/select";

// リロードで再取得されないよう手動でサーバー側にキャッシュを作成
// NOTE:排他制御かけてないので挙動怪しい
let rankCache: Score[] = [];

/**
 * 旧バージョンでのランキング取得
 * NOTE: 常にキャッシュを使用する
 * @returns ランキング
 */
export const getOldRanking = async () => {
  if (rankCache.length == 0) {
    // TODO: 特定バージョンの日にちの取得方法検討
    const resetDate = findResetDate(getDescHistories());
    rankCache = await fetchDbScoreAll(resetDate, undefined, 1000);
  }
  return rankCache;
};
