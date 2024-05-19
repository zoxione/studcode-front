import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Viewport } from "next"
import { Roboto } from "next/font/google"
import { ReactNode, Suspense } from "react"
import Script from "next/script"

import { metaData } from "@/01-shared/lib/meta-data"
import { YandexMetrika } from "@/01-shared/lib/yandex-metrika"
import { CookieBanner } from "@/04-widgets/cookie-banner"
import { Providers } from "@/07-core/providers/providers"
import "@/07-core/styles/globals.css"

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

export const metadata = metaData
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
          <Script defer src={`${process.env.UMAMI_URL}/script.js`} data-website-id={process.env.UMAMI_WEBSITE_ID} />
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
