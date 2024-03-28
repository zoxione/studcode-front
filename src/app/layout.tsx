import { Roboto } from "next/font/google"
import { ReactNode, Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"

import "@/07-core/styles/globals.css"
import { Providers } from "@/07-core/providers/providers"
import { CookieBanner } from "@/04-widgets/cookie-banner"
import { YandexMetrika } from "@/01-shared/lib/yandex-metrika"

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Студенческий Код",
    default: "Студенческий Код",
  },
  description:
    "Студенческий Код - это платформа, на которой каждый студент может публиковать свои проекты и взаимодействовать с другими студентами, обсуждая и оценивая их работы",
  keywords: ["студенческий код", "проекты", "студенты", "код", "учеба", "студент"],
  metadataBase: new URL(process.env.APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: process.env.APP_URL,
    siteName: "Студенческий Код",
    locale: "ru-RU",
    title: "Студенческий Код",
    description:
      "Студенческий Код - это платформа, на которой каждый студент может публиковать свои проекты и взаимодействовать с другими студентами, обсуждая и оценивая их работы",
    images: [{ url: `${process.env.APP_URL}/icon.png`, width: 512, height: 512, alt: "Студенческий Код" }],
  },
}

export const viewport: Viewport = {}

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
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
