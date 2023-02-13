// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMysql from "@/lib/connectMysql";
import { Score } from "@/types/Score";
import checkRequest from "./checkRequest";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score[] | void>
) {
  if (!checkRequest(req, res, "GET")) {
    res.status(500).end();
    return;
  }
  const resData: Score[] | void = await connectMysql()
    .execQuery(
      "select user,score from score_all order by score desc, update_date desc",
      []
    )
    .catch((err) => {
      console.log(err);
      res.status(500).end();
      return;
    });
  res.status(200).json(resData);
}
