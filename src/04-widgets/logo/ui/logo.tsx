"use client"

import Link from "next/link"
import { Roboto_Mono } from "next/font/google"

import { siteConfig } from "@/01-shared/lib"
import { cn } from "@/01-shared/utils/cn"

const roboto_mono = Roboto_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "700"] })

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn(`${roboto_mono.className} font-bold leading-none`, className)}>
      {siteConfig.name}
    </Link>
  )
}
