import { NextResponse } from "next/server"

import type { NextFetchEvent, NextRequest } from "next/server"

type TokenGeneric = {
  sub: string
  username: string
  email: string
  avatar: string
  iat: number
  exp: number
}

function parseJwt(token: string): TokenGeneric | null {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}

function isTokenValid(token: string): boolean {
  if (!token) {
    return false
  }
  const decodedToken = parseJwt(token)
  if (decodedToken === null) {
    return false
  }
  const nowUnix = (+new Date() / 1e3) | 0
  return decodedToken.exp > nowUnix
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const nowUnix = (+new Date() / 1e3) | 0
  const newResponse = NextResponse.next()

  let accessToken: string = request.cookies.get("access_token")?.value || ""
  let refreshToken: string = request.cookies.get("refresh_token")?.value || ""

  let accessTokenIsValid = isTokenValid(accessToken)
  if (!accessTokenIsValid && refreshToken) {
    console.log("[Middleware] Update tokens")
    const res = await fetch(`${process.env.API_URL}/v1/auth/refresh`, {
      method: "GET",
      headers: {
        Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      },
    })
    if (res.ok) {
      const data: { access_token: string; refresh_token: string } = await res.json()
      const access_token_decoded = parseJwt(data.access_token)

      if (access_token_decoded) {
        console.log("[Middleware] Setting new tokens")
        newResponse.cookies.set({
          name: "access_token",
          value: data.access_token,
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: access_token_decoded.exp - nowUnix,
        })
        accessTokenIsValid = true
      }
    }
  }

  return accessTokenIsValid ? newResponse : NextResponse.next()
}
