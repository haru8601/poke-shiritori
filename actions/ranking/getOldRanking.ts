"use server";

import { Score } from "@/types/Score";
import { findResetDate } from "@/utils/findResetHistory";
import { getSortedHistories } from "@/utils/getSortedHistories";
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
    // FIXME: 特定バージョンの日にちの取得方法検討
    const resetDate = findResetDate(getSortedHistories());
    rankCache = await fetchDbScoreAll(resetDate, undefined);
  }
  return rankCache;
};
