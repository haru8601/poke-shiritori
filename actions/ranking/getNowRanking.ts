"use server";

import { getPastMonthDate } from "@/lib/date/dayjs";
import { Score } from "@/types/Score";
import { findResetDate } from "@/utils/findResetHistory";
import { getDescHistories } from "@/utils/getDescHistories";
import fetchDbScoreAll from "../../lib/mysql/select";

// リロードで再取得されないよう手動でサーバー側にキャッシュを作成
// NOTE:排他制御かけてないので挙動怪しい
let monthRankCache: Score[] = [];
let totalRankCache: Score[] = [];

/**
 * 現在のバージョンでのランキング取得
 * @param forceFetch true:キャッシュを使用しない
 * @param isMonth true: 月間ランキング, false: 総合ランキング
 * @returns ランキング
 */
export const getNowRanking = async (forceFetch: boolean, isMonth: boolean) => {
  // 月間ランキング更新
  if (isMonth) {
    if (forceFetch || monthRankCache.length == 0) {
      const startDate = getPastMonthDate(1);
      monthRankCache = (await fetchDbScoreAll(undefined, startDate)) ?? [];
    }
    return monthRankCache;
  } else {
    if (forceFetch || totalRankCache.length == 0) {
      const startDate = findResetDate(getDescHistories());
      totalRankCache = (await fetchDbScoreAll(undefined, startDate, 5000)) ?? [];
    }
    return totalRankCache;
  }
};
