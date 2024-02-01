"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { UserMenu } from "../../../02-entities/user"

import { navLinks } from "@/01-shared/lib"
import { Button } from "@/01-shared/ui/Button"
import { cn } from "@/01-shared/utils/cn"
import { useWhoamiQuery } from "@/02-entities/user"
import { Search } from "@/03-features/search"
import { Logo } from "@/04-widgets/logo"

interface IDesktopNavProps {
  className?: string
}

export const DesktopNav = ({ className }: IDesktopNavProps) => {
  const { isPending, data: user, isSuccess } = useWhoamiQuery()
  console.log(user)

  return (
    <nav className={cn("container flex items-center justify-between py-4", className)}>
      <Logo />
      <div className="flex items-center space-x-4 mx-8 lg:space-x-6">
        <Search />
        {navLinks.map((item) => (
          <Link key={item.id} href={item.path} className="text-sm font-medium transition-colors hover:text-primary">
            {item.title}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {isPending ? (
          <ReloadIcon className="h-4 w-4 animate-spin" />
        ) : isSuccess ? (
          <>
            <Button asChild>
              <Link href="/projects/new">Добавить проект</Link>
            </Button>
            <UserMenu />
          </>
        ) : (
          <Button asChild>
            <Link href="/sign-in">Войти</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
