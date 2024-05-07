"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { User } from "@/02-entities/user"
import { Tabs, TabsList, TabsTrigger } from "@/01-shared/ui/tabs"
import { cn } from "@/01-shared/utils/cn"
import { ScrollArea, ScrollBar } from "@/01-shared/ui/scroll-area"

interface UserTabsProps {
  user: User
  isOwner: boolean
  className?: string
}

const UserTabs = ({ user, isOwner, className }: UserTabsProps) => {
  const tabs = [
    { id: 0, label: "Профиль", value: "", owner: false },
    { id: 1, label: "Команды", value: "teams", owner: false },
    { id: 2, label: "Проекты", value: "projects", owner: false },
    { id: 3, label: "Черновики", value: "drafts", owner: true },
  ]
  const pathname = usePathname()
  const splitPathname = pathname.split("/")
  const tabsValue = tabs.map((tab) => tab.value).includes(splitPathname[splitPathname.length - 1])
    ? splitPathname[splitPathname.length - 1]
    : ""

  return (
    <ScrollArea className="">
      <Tabs defaultValue={tabsValue} className={cn("", className)}>
        <TabsList className="">
          {tabs
            .filter((tab) => tab.owner === false)
            .map((tab) => (
              <TabsTrigger key={tab.id} value={tab.value} asChild>
                <Link href={`/${user.username}/${tab.value}`} scroll={false}>
                  {tab.label}
                </Link>
              </TabsTrigger>
            ))}
          {isOwner
            ? tabs
                .filter((tab) => tab.owner === true)
                .map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.value} asChild>
                    <Link href={`/${user.username}/${tab.value}`} scroll={false}>
                      {tab.label}
                    </Link>
                  </TabsTrigger>
                ))
            : null}
        </TabsList>
      </Tabs>
      <ScrollBar orientation="horizontal" className="" />
    </ScrollArea>
  )
}

export { UserTabs }
