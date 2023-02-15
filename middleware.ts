import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

/**
 * APIリクエストに対するミドルウェア
 */
export function middleware(request: NextRequest) {
  // local以外はアクセス不可
  if (
    // サーバー内からのリクエスト時はheadersが空
    request.headers.has("x-real-ip") &&
    request.headers.get("x-real-ip") !== "::1"
  ) {
    console.log("auth error. headers:");
    console.log(request.headers);
    return NextResponse.redirect(`${request.nextUrl.origin}/401`);
  }
}
