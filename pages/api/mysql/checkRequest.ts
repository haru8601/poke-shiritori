import { NextApiRequest, NextApiResponse } from "next";

export default function checkRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  method: "GET" | "POST"
) {
  if (req.method !== method) {
    console.log("method not allowed");
    res.redirect("/405").end();
    return false;
  }
  // if (method == "POST" && req.headers["content-type"] !== "application/json") {
  console.log("csrf???");
  console.log(req.headers);
  res.redirect("/400").end();
  //   return false;
  // }
  // if (requestIp.getClientIp(req) !== "::1") {
  //   console.log("who are u?");
  //   console.log(req);
  //   res.redirect("/400").end();
  //   return false;
  // }
  return true;
}
