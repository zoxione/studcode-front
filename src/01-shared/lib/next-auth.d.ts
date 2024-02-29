/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */

import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      _id: string
      username: string
      email: string
      avatar: string
    }
    access_token: string
    access_token_exp: number
    refresh_token: string
    refresh_token_exp: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string
      username: string
      email: string
      avatar: string
    }
    access_token: string
    access_token_exp: number
    refresh_token: string
    refresh_token_exp: number
  }
}
