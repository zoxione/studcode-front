import { ReactNode } from "react"

import { cn } from "@/01-shared/utils/cn"

interface ILayoutProps {
  className?: string
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

export const Layout = ({ className, header, children, footer }: ILayoutProps) => {
  return (
    <>
      <div data-hello="hello_world" />
      {header}
      <main className={cn("container flex-1", className)}>{children}</main>
      {footer}
    </>
  )
}
