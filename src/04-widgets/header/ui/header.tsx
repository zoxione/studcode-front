import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"

import { cn } from "@/01-shared/utils/cn"

interface IHeaderProps {
  className?: string
}

export const Header = ({ className }: IHeaderProps) => {
  return (
    <header
      className={cn("w-full sticky top-0 z-50 border-b border-b-border backdrop-blur-sm bg-background/80", className)}
    >
      <DesktopNav className="" />
      {/* <DesktopNav className="hidden lg:flex" /> */}
      {/* <MobileNav className="lg:hidden flex" /> */}
    </header>
  )
}
