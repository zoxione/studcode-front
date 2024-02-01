"use client"

import { ChevronDownIcon, CopyIcon, ExitIcon, GearIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Button } from "@/01-shared/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/DropdownMenu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/01-shared/ui/Tooltip"
import { useLogoutMutation, useWhoamiQuery } from "@/02-entities/user"

export function UserMenu() {
  const { data: user } = useWhoamiQuery()
  const { mutate: logout } = useLogoutMutation()

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    logout()
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CopyIcon onClick={handleCopyEmail} className="h-4 w-4 hover:text-muted-foreground cursor-copy" />
                  </TooltipTrigger>
                  <TooltipContent>Скопировать</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
            <Link href={`/u/${user.sub}`}>
              Профиль <PersonIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user.sub}/settings`}>
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
