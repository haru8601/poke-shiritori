"use server";

import fetchDbScoreAll from "../../lib/mysql/select";

export default async function getRanking() {
  return await fetchDbScoreAll();
}
