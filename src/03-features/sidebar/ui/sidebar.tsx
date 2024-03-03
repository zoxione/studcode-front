"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HTMLAttributes, ReactNode } from "react"

import { buttonVariants } from "@/01-shared/ui/Button"
import { cn } from "@/01-shared/utils/cn"

interface Item {
  href: string
  label: string | ReactNode
}

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items: Item[]
}

const Sidebar = ({ items, className, ...props }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <nav className={cn("flex lg:flex-col gap-2", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(buttonVariants({ variant: pathname === item.href ? "default" : "ghost" }), "justify-start")}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export { Sidebar }
