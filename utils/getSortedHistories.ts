import { HISTORIES, History } from "@/const/history";

export const getSortedHistories = (): History[] => {
  // ディープコピー
  const tmpHistories = JSON.parse(JSON.stringify(HISTORIES)) as History[];
  return tmpHistories.sort(
    (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
  );
};
