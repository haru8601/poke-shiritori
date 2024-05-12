import { HISTORIES, History } from "@/const/history";

/**
 * 作成日時で降順にした履歴一覧
 */
export const getDescHistories = (): History[] => {
  // ディープコピー
  const tmpHistories = JSON.parse(JSON.stringify(HISTORIES)) as History[];
  return tmpHistories.sort(
    (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
  );
};
