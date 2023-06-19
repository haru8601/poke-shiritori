import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.locale("ja");

export const parseDayjs = (
  date?: string | number | Date | dayjs.Dayjs | null | undefined
): Dayjs => {
  return dayjs(date);
};
