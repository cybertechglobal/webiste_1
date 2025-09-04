import { NextResponse, type NextRequest } from "next/server";
import {
  AUTHENTICATION_COOKIE_NAME,
  AUTOHOUSE_ID_COOKIE_NAME,
} from "./lib/definitions";
import { login } from "./lib/login";

export async function middleware(request: NextRequest) {
  const bearer = request.cookies.get(AUTHENTICATION_COOKIE_NAME);
  const autoHouseId = request.cookies.get(AUTOHOUSE_ID_COOKIE_NAME);

  if (
    (bearer === undefined || autoHouseId === undefined) &&
    request.nextUrl.pathname.startsWith("/unauthorized")
  ) {
    const res = await login();
    if (!res.errors && res.success !== false) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (
    bearer !== undefined &&
    autoHouseId !== undefined &&
    request.nextUrl.pathname.startsWith("/unauthorized")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
