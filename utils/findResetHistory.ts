import { Dayjs } from "dayjs";
import { History } from "@/const/history";
import { parseDayjs } from "@/lib/date/dayjs";

export const findResetDate = (sotredHistories: History[]): Dayjs => {
  return parseDayjs(
    sotredHistories.find((history) => {
      return history.rankReset;
    })?.createdAt
  );
};
