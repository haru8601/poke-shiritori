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
  const resData = await connectMysql().execQuery("select * from poke", []);
  res.status(200).json(resData);
}
