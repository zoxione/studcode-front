import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

import { refreshTokens } from "../utils/refresh-tokens"

const timeBuffer = 10

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/?dialog=auth",
  },
  events: {
    signOut: async ({}) => {
      cookies().delete(process.env.ACCESS_TOKEN_NAME)
      cookies().delete(process.env.REFRESH_TOKEN_NAME)
    },
  },
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const { email, password } = credentials
        const res = await fetch(`${process.env.API_URL}/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          return null
        }

        const data = await res.json()
        const nowUnix = (+new Date() / 1e3) | 0

        cookies().set({
          name: process.env.ACCESS_TOKEN_NAME,
          value: data.access_token,
          domain: process.env.TOKEN_DOMAIN,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
          maxAge: data.access_token_exp - nowUnix,
        })
        cookies().set({
          name: process.env.REFRESH_TOKEN_NAME,
          value: data.refresh_token,
          domain: process.env.TOKEN_DOMAIN,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
          maxAge: data.refresh_token_exp - nowUnix,
        })

        return data
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user: response, trigger, session }) {
      if (trigger === "update") {
        token.user = session
      }
      if (response) {
        // в первый раз
        console.log("[AUTH] First time login")
        return { ...token, ...response }
      }
      const nowUnix = (+new Date() / 1e3) | 0
      if (nowUnix + timeBuffer > token.access_token_exp) {
        // токен устарел
        console.log("[AUTH] Refreshing access token")
        const data = await refreshTokens(token)
        return { ...token, ...data }
      }
      return token
    },

    async session({ token, session }) {
      session.user = token.user
      session.access_token = token.access_token
      session.access_token_exp = token.access_token_exp
      session.refresh_token = token.refresh_token
      session.refresh_token_exp = token.refresh_token_exp
      return session
    },
  },
}
