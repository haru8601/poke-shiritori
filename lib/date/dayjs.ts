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

/**
 * 指定月分減算した日にち
 * @param num 指定月数
 * @returns 減算された日にち
 */
export const getPastMonthDate = (num: number) => dayjs().subtract(num, "month");
