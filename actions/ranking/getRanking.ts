"use server";

import { Score } from "@/types/Score";
import fetchDbScoreAll from "../../lib/mysql/select";

// リロードで再取得されないよう手動でサーバー側にキャッシュを作成
// NOTE:排他制御かけてないので挙動怪しい
let rankCache: Score[] = [];

export const getRanking = async (forceFetch: boolean) => {
  if (forceFetch || rankCache.length == 0) {
    rankCache = await fetchDbScoreAll();
  }
  return rankCache;
};
