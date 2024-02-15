import { Roboto } from "next/font/google"
import { ReactNode, Suspense } from "react"

import type { Metadata } from "next"

import { Providers } from "@/07-core/providers/providers"
import { YandexMetrika } from "@/01-shared/lib/yandex-metrika"
import "@/07-core/styles/globals.css"

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Студенческий Код",
  description: "",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className="flex min-h-full" suppressHydrationWarning>
      <body className={`${roboto.className} flex flex-col flex-auto overflow-x-hidden m-0 p-0`}>
        <Suspense>
          <YandexMetrika />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
