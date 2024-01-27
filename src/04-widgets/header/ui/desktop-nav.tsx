"use client"

import { cn } from "@/01-shared/utils/cn"
import Link from "next/link"

import { navLinks } from "@/01-shared/lib"
import { Button } from "@/01-shared/ui/Button"
import { userAPI } from "@/02-entities/user"
import { Search } from "@/03-features/search"
import { Logo } from "@/04-widgets/logo"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { UserMenu } from "./user-menu"
import { ReloadIcon } from "@radix-ui/react-icons"

interface IDesktopNavProps {
  className?: string
}

export const DesktopNav = ({ className }: IDesktopNavProps) => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push("/?modal=auth")
  }

  const pathname = usePathname()

  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => userAPI.whoami(),
  })

  console.log(user)

  return (
    <nav className={cn("container flex items-center justify-between py-4", className)}>
      <Logo />
      <div className="flex items-center space-x-4 mx-8 lg:space-x-6">
        <Search />
        {navLinks.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            scroll={false}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {isPending ? (
          <ReloadIcon className="h-4 w-4 animate-spin" />
        ) : user?.error === null ? (
          <>
            <Button asChild>
              <Link href="/projects/new" scroll={false}>
                Добавить проект
              </Link>
            </Button>
            <UserMenu />
          </>
        ) : (
          <Button asChild>
            <Link href={`${pathname}?modal=auth`} scroll={false}>
              Войти
            </Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
