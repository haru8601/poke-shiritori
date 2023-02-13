// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ResultSetHeader } from "mysql2";
import connectMysql from "@/lib/connectMysql";
import checkRequest from "./checkRequest";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultSetHeader | void>
) {
  if (!checkRequest(req, res, "POST")) {
    res.status(500).end();
    return;
  }
  const param = req.body;
  const resData: ResultSetHeader | void = await connectMysql()
    .execQuery("insert into score_all(user, score) values(?, ?)", [
      param.user,
      param.score,
    ])
    .then((response: ResultSetHeader | void) => response)
    .catch((err) => {
      console.log(err);
      res.status(500).end();
      return;
    });
  res.status(200).json(resData);
}
