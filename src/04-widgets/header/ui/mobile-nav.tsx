"use client"

import { siteConfig } from "@/01-shared/lib"
import { Button } from "@/01-shared/ui/Button"
import { Input } from "@/01-shared/ui/Input"
import { Label } from "@/01-shared/ui/Label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/01-shared/ui/Sheet"
import { cn } from "@/01-shared/utils/cn"
import { MenuIcon, SearchIcon } from "lucide-react"
import Link from "next/link"

interface IMobileNavProps {
  className?: string
}

export const MobileNav = ({ className }: IMobileNavProps) => {
  return (
    <nav className={cn("flex h-20 items-center justify-between py-6", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>aa</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Link href="/" scroll={false} className="font-bold inline-block">
        {siteConfig.name}
      </Link>
      <Button variant="outline" size="icon">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </nav>
  )
}
