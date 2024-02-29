import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { buttonVariants } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"

interface HeaderPageProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

const HeaderPage = forwardRef<HTMLDivElement, HeaderPageProps>(({ title, description, className }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col items-start gap-4", className)}>
      <Link href="/" className={cn(buttonVariants({ variant: "link", size: "px" }), "text-foreground")}>
        <ChevronLeftIcon className="mr-1 h-4 w-4" />
        На главную
      </Link>
      <div>
        <Title order={2}>{title}</Title>
        <span className="">{description}</span>
      </div>
    </div>
  )
})
HeaderPage.displayName = "HeaderPage"

export { HeaderPage }
