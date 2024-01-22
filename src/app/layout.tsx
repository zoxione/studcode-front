import Providers from "@/07-core/providers/providers"
import "@/07-core/styles/globals.css"
import type { Metadata } from "next"
// import { Roboto } from "next/font/google"
import { ReactNode } from "react"

// const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Студенческий Код",
  description: "Это место для описания вашего проекта",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
      // className={roboto.className}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
