"use server";

import { Score } from "@/types/Score";
import { findResetDate } from "@/utils/findResetHistory";
import { getSortedHistories } from "@/utils/getSortedHistories";
import fetchDbScoreAll from "../../lib/mysql/select";

// リロードで再取得されないよう手動でサーバー側にキャッシュを作成
// NOTE:排他制御かけてないので挙動怪しい
let rankCache: Score[] = [];

/**
 * 現在のバージョンでのランキング取得
 * @param forceFetch true:キャッシュを使用しない
 * @returns ランキング
 */
export const getNowRanking = async (forceFetch: boolean) => {
  if (forceFetch || rankCache.length == 0) {
    const resetDate = findResetDate(getSortedHistories());
    rankCache = (await fetchDbScoreAll(undefined, resetDate)) ?? [];
  }
  return rankCache;
};
