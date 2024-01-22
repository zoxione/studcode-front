import { cn } from "@/01-shared/utils/cn"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"

interface IHeaderProps {
  className?: string
}

export const Header = ({ className }: IHeaderProps) => {
  return (
    <header className={cn("sticky top-0 z-40 bg-background border-b border-b-border", className)}>
      <DesktopNav className="hidden lg:flex" />
      <MobileNav className="lg:hidden flex" />
    </header>
  )
}
