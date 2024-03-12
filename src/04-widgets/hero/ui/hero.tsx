import { PlusCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HTMLAttributes } from "react"

import { buttonVariants } from "@/01-shared/ui/button"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"

interface HeroProps extends HTMLAttributes<HTMLDivElement> {}

const Hero = ({ className }: HeroProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Title order={1} className="text-center">
        Лучшие студенческие
      </Title>
      <Title order={2} className="text-center font-normal mb-6">
        проекты России
      </Title>
      <Link href="/projects/new" className={cn(buttonVariants({ size: "sm" }))}>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Добавить проект
      </Link>
    </div>
  )
}

export { Hero }
