// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMysql from "@/lib/connectMysql";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const param = req.body;
  const resData = await connectMysql().execQuery(
    "insert into score_all(user, score) values(?, ?)",
    [param.user, param.score]
  );
  res.status(200).json(resData);
}
