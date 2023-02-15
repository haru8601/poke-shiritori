import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

/**
 * APIリクエストに対するミドルウェア
 */
export function middleware(request: NextRequest) {
  // local以外はアクセス不可
  const requestIp = request.headers.get("x-real-ip");
  if (requestIp !== undefined && requestIp !== "::1") {
    console.log("auth error. ip:" + requestIp + "|");
    request.headers.forEach((val, key) => {
      if (
        val.includes("localhost") ||
        val.includes("::1") ||
        val.includes("127.0")
      )
        console.log(key + "||||" + val);
    });
    return NextResponse.json([]);
  }
}
