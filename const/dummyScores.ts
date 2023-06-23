import { parseDayjs } from "@/lib/date/dayjs";
import { Score } from "@/types/Score";

export const dummyScores: Score[] = [
  {
    user: "Sランク",
    score: 20000,
    update_date: parseDayjs("2020-01-01").toDate(),
  },
  {
    user: "Aランク",
    score: 10000,
    update_date: parseDayjs("2020-01-01").toDate(),
  },
  {
    user: "Bランク",
    score: 5000,
    update_date: parseDayjs("2020-01-01").toDate(),
  },
  {
    user: "Cランク",
    score: 1000,
    update_date: parseDayjs("2020-01-01").toDate(),
  },
];
