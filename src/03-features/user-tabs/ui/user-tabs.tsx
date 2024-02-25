"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

import { User } from "@/02-entities/user"
import { Tabs, TabsList, TabsTrigger } from "@/01-shared/ui/Tabs"
import { cn } from "@/01-shared/utils/cn"

interface UserTabsProps {
  user: User
  isOwner: boolean
  className?: string
}

const UserTabs = ({ user, isOwner, className }: UserTabsProps) => {
  const tabsValues = ["", "projects", "drafts"]
  const pathname = usePathname()
  const splitPathname = pathname.split("/")
  const tabsValue = tabsValues.includes(splitPathname[splitPathname.length - 1]) ? splitPathname[3] : ""

  return (
    <Tabs defaultValue={tabsValue} className={cn("", className)}>
      <TabsList className="mb-6">
        <TabsTrigger value="" asChild>
          <Link href={`/${user.username}`} scroll={false}>
            Профиль
          </Link>
        </TabsTrigger>
        <TabsTrigger value="projects" asChild>
          <Link href={`/${user.username}/projects`} scroll={false}>
            Проекты
          </Link>
        </TabsTrigger>
        {isOwner ? (
          <TabsTrigger value="drafts" asChild>
            <Link href={`/${user.username}/drafts`} scroll={false}>
              Черновики
            </Link>
          </TabsTrigger>
        ) : null}
      </TabsList>
    </Tabs>
  )
}

export { UserTabs }
