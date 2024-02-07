"use client"

import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

import { UserMenu } from "../../../02-entities/user"

import { navLinks } from "@/01-shared/lib"
import { Button } from "@/01-shared/ui/Button"
import { Input } from "@/01-shared/ui/Input"
import { Label } from "@/01-shared/ui/Label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/01-shared/ui/Sheet"
import { cn } from "@/01-shared/utils/cn"
import { useWhoamiQuery } from "@/02-entities/user"
import { Search } from "@/03-features/search"
import { Logo } from "@/04-widgets/logo"
import { ScrollArea } from "@/01-shared/ui/ScrollArea"
import { usePathname, useRouter } from "next/navigation"

interface IDesktopNavProps {
  className?: string
}

export const DesktopNav = ({ className }: IDesktopNavProps) => {
  const { isPending, data: user, isSuccess } = useWhoamiQuery()
  console.log(user)

  const pathname = usePathname()

  return (
    <div className={cn("container flex items-center gap-2 md:gap-12 py-4", className)}>
      <div className="hidden md:flex items-center gap-6">
        <Logo />
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`
                ${pathname === item.path ? "text-primary/90" : ""}
                text-sm font-medium leading-none transition-colors hover:text-primary
              `}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Logo />

          <ScrollArea className="pb-10 pl-6 my-10 h-[calc(100vh-8rem)]">
            <div className="flex flex-col justify-center gap-6 h-full">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="text-3xl font-medium transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
        <Search className="flex-1 lg:flex-none" />
        {isPending ? (
          <ReloadIcon className="h-4 w-4 animate-spin" />
        ) : isSuccess ? (
          <>
            <Button asChild>
              <Link href="/projects/new">
                <span className="hidden md:block">Добавить проект</span>
                <span className="md:hidden">
                  <PlusIcon className="h-4 w-4" />
                </span>
              </Link>
            </Button>
            <UserMenu />
          </>
        ) : (
          <Button asChild>
            <Link href="/sign-in">Войти</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
