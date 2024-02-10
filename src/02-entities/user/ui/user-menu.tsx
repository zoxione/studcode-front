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
import { useLogoutMutation, useSession } from "@/03-features/auth"
import { Session } from "@/02-entities/session"

interface UserMenuProps {
  session: Session
}

export function UserMenu({ session }: UserMenuProps) {
  const { mutate: logout } = useLogoutMutation()

  if (!session) {
    return null
  }

  const handleLogout = async () => {
    logout()
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(session.email)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.avatar} alt={session.username} />
            <AvatarFallback>{session.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.username}</p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs leading-none text-muted-foreground">{session.email}</p>
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
            <Link href={`/u/${session.sub}`}>
              Профиль <PersonIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/u/${session.sub}/settings`}>
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
