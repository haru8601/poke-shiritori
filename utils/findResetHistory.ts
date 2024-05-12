import { Dayjs } from "dayjs";
import { History } from "@/const/history";
import { parseDayjs } from "@/lib/date/dayjs";

// TODO: 日付でなくバージョンで判別するよう変更
export const findResetDate = (descHistories: History[]): Dayjs => {
  return parseDayjs(
    descHistories.find((history) => {
      return history.rankReset;
    })?.createdAt
  );
};
