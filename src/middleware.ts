import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin") {
    return NextResponse.next();
  }
  const isAdmin = request.cookies.get("admin_access")?.value === "true";
  if (isAdmin) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/deals/new", "/deals/:path*/edit"],
};
