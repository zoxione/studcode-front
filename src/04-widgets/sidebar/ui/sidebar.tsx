"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HTMLAttributes, ReactNode } from "react"

import { buttonVariants } from "@/01-shared/ui/Button"
import { cn } from "@/01-shared/utils/cn"
import { ScrollArea, ScrollBar } from "@/01-shared/ui/ScrollArea"

interface Item {
  href: string
  label: string | ReactNode
  icon?: ReactNode
}

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items: Item[]
}

const Sidebar = ({ items, className, ...props }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <nav {...props}>
      <ScrollArea>
        <div className="flex lg:flex-col gap-2 py-3 lg:py-0">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: pathname === item.href ? "default" : "ghost" }),
                "justify-start gap-2",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </nav>
  )
}

export { Sidebar }
