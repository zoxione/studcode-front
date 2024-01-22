"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Button } from "@/01-shared/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/01-shared/ui/DropdownMenu"
import { userAPI } from "@/02-entities/user"
import { CopyIcon, ExitIcon, GearIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export function UserMenu() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => userAPI.whoAmI(),
  })

  console.log(user)

  const handleLogout = () => {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.data?.username}</p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs leading-none text-muted-foreground">{user?.data?.email}</p>
              <CopyIcon className=" h-4 w-4" />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/projects/new`}>
              Добавить проект <PlusIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/user/${user?.data?.sub}`}>
              Профиль <PersonIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/user/${user?.data?.sub}/settings`}>
              Настройки <GearIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
          Выйти
          <ExitIcon className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
