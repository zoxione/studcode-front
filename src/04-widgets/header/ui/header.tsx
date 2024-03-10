"use client"

import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { footerLinks, navLinks } from "@/01-shared/lib"
import { Button } from "@/01-shared/ui/Button"
import { ScrollArea } from "@/01-shared/ui/ScrollArea"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/01-shared/ui/Sheet"
import { cn } from "@/01-shared/utils/cn"
import { SearchDialog } from "@/03-features/search"
import { Logo } from "@/04-widgets/logo"
import { ToggleTheme } from "@/03-features/toggle-theme"
import { UserMenu } from "../../../02-entities/user"

interface IHeaderProps {
  className?: string
}

export const Header = ({ className }: IHeaderProps) => {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  // console.log({ session, status })

  return (
    <header
      className={cn("w-full sticky top-0 z-50 border-b border-b-border backdrop-blur-sm bg-background/80", className)}
    >
      <div className={cn("container flex items-center gap-2 md:gap-12 py-4", className)}>
        <div className="hidden md:flex items-center gap-6">
          <Logo />
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`${
                  pathname === item.path ? "text-primary/90" : ""
                } text-sm font-medium leading-none transition-colors hover:text-primary`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="text-left">
              <Logo />
            </SheetHeader>
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1 my-8">
                <div className="flex flex-col justify-center gap-2 h-full">
                  {navLinks.map((item) => (
                    <Button
                      key={item.id}
                      asChild
                      variant={pathname === item.path ? "secondary" : "ghost"}
                      size="lg"
                      className="justify-start text-lg"
                    >
                      <Link href={item.path}>{item.title}</Link>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex flex-col gap-4">
                <ul className="flex flex-col md:flex-row md:items-center gap-2">
                  {footerLinks.map((link) => (
                    <li key={link.id} className="hover:text-foreground/60">
                      <Link href={link.href} target="_blank">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ToggleTheme />
                <span className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} <Link href="/">Студенческий Код™</Link>
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <SearchDialog className="flex-1 lg:flex-none" />
          {status === "loading" ? (
            <Button variant="ghost" size="icon">
              <ReloadIcon className="h-4 w-4 animate-spin" />
            </Button>
          ) : status === "authenticated" ? (
            <>
              <Button asChild>
                <Link href="/projects/new">
                  <span className="hidden md:block">Добавить проект</span>
                  <span className="md:hidden">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <UserMenu user={session.user} />
            </>
          ) : (
            <Button asChild>
              <Link href="/?dialog=auth">Войти</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
