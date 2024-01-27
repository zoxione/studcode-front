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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/01-shared/ui/Tooltip"
import { userAPI } from "@/02-entities/user"
import { ChevronDownIcon, CopyIcon, ExitIcon, GearIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function UserMenu() {
  const router = useRouter()

  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => userAPI.whoami(),
  })

  const handleLogout = async () => {
    const res = await userAPI.logout()

    if (res.error === null) {
      toast.success("Вы вышли из аккаунта")
      window.location.reload()
    } else {
      toast.error("Произошла ошибка")
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user?.data?.email || "")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.data?.avatar} alt={user?.data?.username} />
            <AvatarFallback>{user?.data?.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.data?.username}</p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs leading-none text-muted-foreground">{user?.data?.email}</p>
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
            <Link href={`/projects/new`} scroll={false}>
              Добавить проект <PlusIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user?.data?.sub}`} scroll={false}>
              Профиль <PersonIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user?.data?.sub}/settings`} scroll={false}>
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
