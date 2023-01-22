import { CONFIG } from "@/const/config";
import LRU from "lru-cache";

/* キャッシュをグローバルで生成 */
const tokenCache = new LRU<string, number>({
  /* user count */
  max: CONFIG.requestLimit.maxUserCount,
  /* time to live */
  ttl: CONFIG.requestLimit.expired,
});

/**
 * リクエスト上限チェック
 * @returns resolve: void, reject: 429エラーメッセージ
 */
export default function limitChecker() {
  const check = (token: string) =>
    new Promise<void>((resolve, reject) => {
      /* キャッシュからリクエスト回数取得 */
      const tokenCount: number = (tokenCache.get(token) as number) || 0;
      /* リクエスト数追加してセット */
      const currentUsage = tokenCount + 1;
      tokenCache.set(token, currentUsage);

      return currentUsage > CONFIG.requestLimit.requestCount
        ? reject(`Too many requests.\nclient ip:${token}`)
        : resolve();
    });
  return { check } as const;
}
