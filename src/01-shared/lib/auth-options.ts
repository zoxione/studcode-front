import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

async function refreshToken(token: JWT): Promise<JWT> {
  console.log("refreshed")
  const res = await fetch(process.env.API_URL + "/v1/auth/refresh", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token.refresh_token}`,
    },
  })
  const data = await res.json()
  const nowUnix = (+new Date() / 1e3) | 0
  cookies().set({
    name: process.env.ACCESS_TOKEN_NAME,
    value: data.access_token,
    // domain: process.env.TOKEN_DOMAIN,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: data.access_token_exp - nowUnix,
  })
  return { ...token, ...data }
}

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
      async authorize(credentials, req) {
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
          // credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (res.status == 401) {
          console.log(res.statusText)
          return null
        }

        const data = await res.json()
        const nowUnix = (+new Date() / 1e3) | 0

        cookies().set({
          name: process.env.ACCESS_TOKEN_NAME,
          value: data.access_token,
          // domain: process.env.TOKEN_DOMAIN,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: data.access_token_exp - nowUnix,
        })
        cookies().set({
          name: process.env.REFRESH_TOKEN_NAME,
          value: data.refresh_token,
          // domain: process.env.TOKEN_DOMAIN,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: data.refresh_token_exp - nowUnix,
        })

        return data
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user: response }) {
      if (response) {
        // в первый раз
        return { ...token, ...response }
      }
      const nowUnix = (+new Date() / 1e3) | 0
      if (nowUnix > token.access_token_exp) {
        return await refreshToken(token)
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
