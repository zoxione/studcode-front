"use client"

import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  ExitIcon,
  GearIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Button } from "@/01-shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/01-shared/ui/tooltip"

interface UserMenuProps {
  user: Session["user"]
}

export function UserMenu({ user }: UserMenuProps) {
  const [openMenu, setOpenMenu] = useState(false)

  const handleLogout = async () => {
    await signOut()
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email)
  }

  return (
    <DropdownMenu onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`p-1 gap-0.5 focus-visible:ring-0 ${openMenu ? "bg-accent text-accent-foreground" : ""}`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} asChild>
              <Image src={user.avatar} alt={user.username} fill />
            </AvatarImage>
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          {openMenu ? (
            <ChevronUpIcon className="h-4 w-4 animate-in spin-in-180 duration-200" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 animate-in spin-in-180 duration-200" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <CopyIcon onClick={handleCopyEmail} className="h-4 w-4 hover:text-muted-foreground cursor-copy" />
                </TooltipTrigger>
                <TooltipContent>Скопировать</TooltipContent>
              </Tooltip>
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
            <Link href={`/${user.username}`}>
              Профиль <PersonIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/settings`}>
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
