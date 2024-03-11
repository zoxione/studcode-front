"use client"

import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/01-shared/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/01-shared/ui/DropdownMenu"
import { cn } from "@/01-shared/utils/cn"
import { useToggleTheme } from "../lib/use-toggle-theme"

interface ToggleThemeProps {
  className?: string
}

const ToggleTheme = ({ className }: ToggleThemeProps) => {
  const { setTheme } = useToggleTheme({})

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="sm" className={cn("h-8 w-8 px-0", className)}>
          <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="mr-2 h-4 w-4" />
          <span>Светлая</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>Темная</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <LaptopIcon className="mr-2 h-4 w-4" />
          <span>Системная</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ToggleTheme }
