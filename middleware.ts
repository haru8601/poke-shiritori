import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

/**
 * APIリクエストに対するミドルウェア
 */
export function middleware(request: NextRequest) {
  // local以外はアクセス不可
  if (request.headers.get("x-real-ip") !== "::1") {
    console.log("auth error. headers:");
    console.log(request.headers);
    console.log(
      `${new URL(
        `${request.headers.get("x-forwarded-proto")}://${request.headers.get(
          "x-forwarded-host"
        )}`
      )}401`
    );
    return NextResponse.redirect(
      `${new URL(
        `${request.headers.get("x-forwarded-proto")}://${request.headers.get(
          "x-forwarded-host"
        )}`
      )}401`
    );
  }
}
