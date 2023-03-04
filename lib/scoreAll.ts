import "server-only";

import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Score } from "@/types/Score";

function readScoreAll(): Score[] {
  let res = [];
  try {
    res = JSON.parse(
      readFileSync(path.join(process.cwd(), "lib/scoreAll.json")).toString()
    );
  } catch (err) {
    console.log("error while parse scoreAll.json");
    console.log(err);
  }
  return res;
}

export function getScoreAll(): readonly Score[] {
  const scoreAll = readScoreAll();
  /* ソート */
  scoreAll.sort((a, b) => {
    if (a.score != b.score) {
      return b.score - a.score;
    }
    if (a.update_date && b.update_date) {
      return (
        new Date(b.update_date).getTime() - new Date(a.update_date).getTime()
      );
    }
    return 0;
  });
  return scoreAll as readonly Score[];
}

export function pushScores(scores: Score[]): void {
  const scoreAll = readScoreAll();
  scoreAll.push(...scores);
  writeFileSync(
    path.join(process.cwd(), "lib/scoreAll.json"),
    JSON.stringify(scoreAll, undefined, 2)
  );
  return;
}
