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
  if (requestIp !== null && requestIp !== "::1") {
    console.log("auth error. headers:");
    console.log(request.headers);
    return NextResponse.json([]);
  }
}
