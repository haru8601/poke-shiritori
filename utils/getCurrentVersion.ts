import { getDescHistories } from "./getDescHistories";

/**
 * 現在のバージョンを取得
 */
export const getCurrentVersion = (): string | null => {
  const descHistories = getDescHistories();
  return descHistories.shift()?.version || null;
};
