import { Button } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { HTMLAttributes } from "react"

interface HeroProps extends HTMLAttributes<HTMLDivElement> {}

const Hero = ({ className }: HeroProps) => {
  return (
    <div className={cn("flex flex-col justify-center", className)}>
      <Title order={1} className="text-center">
        Лучшие студенческие
      </Title>
      <Title order={2} className="text-center font-normal">
        проекты России
      </Title>
      <Button variant="link" className="">
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Добавить проект
      </Button>
    </div>
  )
}

export { Hero }
