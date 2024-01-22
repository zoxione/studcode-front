"use client"

import Link from "next/link"
import { siteConfig } from "@/01-shared/lib"
import { cn } from "@/01-shared/utils/cn"
// import { Roboto_Mono } from "next/font/google"

// const roboto_mono = Roboto_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("", className)}>
      <span
      // className={cn("font-bold", roboto_mono.className)}
      >
        {siteConfig.name}
      </span>
    </Link>
  )
}
