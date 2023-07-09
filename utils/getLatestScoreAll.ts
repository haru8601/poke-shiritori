import { Dayjs } from "dayjs";
import { parseDayjs } from "@/lib/date/dayjs";
import { Score } from "@/types/Score";

export const getLatestScoreAll = (scoreAll: Score[], resetDate: Dayjs) => {
  return scoreAll.filter(
    (score) => !parseDayjs(score.update_date).isBefore(resetDate)
  );
};
