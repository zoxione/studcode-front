import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { Button } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"

interface HeaderPageProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

const HeaderPage = forwardRef<HTMLDivElement, HeaderPageProps>(({ title, description, className }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      <Button variant="link" asChild size="none" className="w-fit text-foreground">
        <Link href="/">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          На главную
        </Link>
      </Button>
      <div>
        <Title order={2}>{title}</Title>
        <span className="">{description}</span>
      </div>
    </div>
  )
})
HeaderPage.displayName = "HeaderPage"

export { HeaderPage }
