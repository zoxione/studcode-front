import { NextResponse } from "next/server"

import { isTokenValid } from "./01-shared/utils/is-token-valid"
import { parseJwt } from "./01-shared/utils/parse-jwt"

import type { NextFetchEvent, NextRequest } from "next/server"

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const nowUnix = (+new Date() / 1e3) | 0
  const newResponse = NextResponse.next()

  let accessToken: string = request.cookies.get(process.env.ACCESS_TOKEN_NAME)?.value || ""
  let refreshToken: string = request.cookies.get(process.env.REFRESH_TOKEN_NAME)?.value || ""

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
