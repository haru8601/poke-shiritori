import { parseDayjs } from "@/lib/date/dayjs";
import { Score } from "@/types/Score";

export const getMonthScoreAll = (scoreAll: Score[]): Score[] => {
  // 1ヶ月前までのスコアでフィルタリング
  return scoreAll.filter((score) =>
    parseDayjs(score.update_date).isAfter(parseDayjs().subtract(1, "month"))
  );
};
