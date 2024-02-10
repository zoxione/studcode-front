"use server"

import { decodeJwt } from "jose"
import { cookies } from "next/headers"

import { Session } from "@/02-entities/session"

const decrypt = (token: string): Session => {
  const session = decodeJwt<Session>(token)
  return session
}

const getSession = (): Session | null => {
  const token = cookies().get(process.env.ACCESS_TOKEN_NAME)?.value
  if (!token) {
    return null
  }
  return decrypt(token)
}

export { getSession }
