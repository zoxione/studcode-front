import { NextResponse } from "next/server"

import { isTokenValid } from "./01-shared/utils/is-token-valid"
import { parseJwt } from "./01-shared/utils/parse-jwt"

import type { NextFetchEvent, NextRequest } from "next/server"

const GUARD_ROUTES = ["/projects/new"]

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const nowUnix = (+new Date() / 1e3) | 0
  const newResponse = NextResponse.next()
  const { pathname } = request.nextUrl

  let accessToken: string = request.cookies.get(process.env.ACCESS_TOKEN_NAME)?.value || ""
  let refreshToken: string = request.cookies.get(process.env.REFRESH_TOKEN_NAME)?.value || ""
  console.log("[Middleware] Tokens", accessToken, refreshToken)
  if (!accessToken && !refreshToken) {
    console.log("[Middleware] No tokens")
    const matchingRoute = GUARD_ROUTES.find((route) => {
      const routePattern = new RegExp(`^${route.replace(/\[.*?\]/g, ".*")}$`)
      return routePattern.test(pathname)
    })
    if (matchingRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  let accessTokenIsValid = isTokenValid(accessToken)
  if (!accessTokenIsValid && refreshToken) {
    console.log("[Middleware] Update tokens")
    const res = await fetch(`${process.env.API_URL}/v1/auth/refresh`, {
      method: "GET",
      headers: {
        Cookie: `${process.env.ACCESS_TOKEN_NAME}=${accessToken}; ${process.env.REFRESH_TOKEN_NAME}=${refreshToken}`,
      },
    })
    if (res.ok) {
      const data: { access_token: string; refresh_token: string } = await res.json()
      const access_token_decoded = parseJwt(data.access_token)

      if (access_token_decoded) {
        console.log("[Middleware] Setting new tokens")
        newResponse.cookies.set({
          name: process.env.ACCESS_TOKEN_NAME,
          value: data.access_token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: access_token_decoded.exp - nowUnix,
        })
        accessTokenIsValid = true
      }
    }
  }

  return accessTokenIsValid ? newResponse : NextResponse.next()
}
