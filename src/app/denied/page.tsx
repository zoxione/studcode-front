import Link from "next/link"
import { InfoIcon } from "lucide-react"
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons"

import { Title } from "@/01-shared/ui/Title"
import { BackButton } from "@/03-features/back-button"
import { buttonVariants } from "@/01-shared/ui/Button"
import { cn } from "@/01-shared/utils/cn"

export default function AccessDenied() {
  return (
    <div className="h-full w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center">
      <CrossCircledIcon className="w-10 h-10 text-primary" />
      <Title order={2} className="my-2">
        Доступ запрещен
      </Title>
      <p className="my-4 text-sm text-muted-foreground">
        К этой странице у вас нет доступа. Вот несколько полезных ссылок:
      </p>
      <div className="flex gap-2">
        <BackButton variant="outline">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Вернуться
        </BackButton>
        <Link href="/" className={cn(buttonVariants({}))}>
          На главную
        </Link>
      </div>
    </div>
  )
}
