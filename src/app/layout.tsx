import { Roboto } from "next/font/google"
import { ReactNode } from "react"

import Providers from "@/07-core/providers/providers"

import type { Metadata } from "next"


import "@/07-core/styles/globals.css"

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Студенческий Код",
  description: "Это место для описания вашего проекта",
}

export default function RootLayout({ auth, children }: { auth: ReactNode; children: ReactNode }) {
  return (
    <html lang="ru" className="flex min-h-full" suppressHydrationWarning>
      <body className={`${roboto.className} flex flex-col flex-auto overflow-x-hidden m-0 p-0`}>
        <Providers>
          {auth}
          {children}
        </Providers>
      </body>
    </html>
  )
}
