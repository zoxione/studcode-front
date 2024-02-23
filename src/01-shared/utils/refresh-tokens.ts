"use server"

import { JWT } from "next-auth/jwt"
import { cookies } from "next/headers"

async function refreshTokens(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.API_URL + "/v1/auth/refresh", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token.refresh_token}`,
    },
  })
  const data = await res.json()
  const nowUnix = (+new Date() / 1e3) | 0
  try {
    cookies().set({
      name: process.env.ACCESS_TOKEN_NAME,
      value: data.access_token,
      domain: process.env.TOKEN_DOMAIN,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      maxAge: data.access_token_exp - nowUnix,
    })
  } catch (err) {}
  return { ...token, ...data }
}

export { refreshTokens }
