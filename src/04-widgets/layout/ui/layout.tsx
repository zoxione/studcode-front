import { cn } from "@/01-shared/utils/cn"
import { ReactNode } from "react"

interface ILayoutProps {
  className?: string
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

export const Layout = ({ className, header, children, footer }: ILayoutProps) => {
  return (
    <>
      {header}
      <main className={cn("container flex-1", className)}>{children}</main>
      {footer}
    </>
  )
}
