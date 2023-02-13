import { NextApiRequest, NextApiResponse } from "next";

export default function checkRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  method: "GET" | "POST"
) {
  if (req.method !== method) {
    console.log("method not allowed");
    res.redirect("/405");
    return false;
  }
  if (method == "POST" && req.headers["content-type"] !== "application/json") {
    console.log("csrf???");
    console.log(req.headers);
    res.redirect("/400");
    return false;
  }
  return true;
}
