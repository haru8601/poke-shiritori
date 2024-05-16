import { getDescHistories } from "../getDescHistories";

/**
 * 最新のメジャーバージョン取得
 * @returns メジャーバージョン
 */
export const getLatestMajorVersion = (): number => {
  const histories = getDescHistories();
  return parseInt(
    histories.shift()?.version.replace(/(\d).\d.\d/g, "$1") ?? ""
  );
};
