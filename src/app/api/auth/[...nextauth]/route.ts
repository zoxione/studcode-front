import NextAuth from "next-auth/next"
import { NextRequest } from "next/server"

import { authOptions } from "@/01-shared/lib/auth-options"

interface RouteHandlerContext {
  params: { nextauth: string[] }
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, authOptions)
}

export { handler as GET, handler as POST }
