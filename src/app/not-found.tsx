import Link from "next/link"
import { InfoIcon } from "lucide-react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import { Title } from "@/01-shared/ui/Title"
import { buttonVariants } from "@/01-shared/ui/Button"
import { cn } from "@/01-shared/utils/cn"
import { BackPageButton } from "@/03-features/back-page"

export default function NotFound() {
  return (
    <div className="h-full w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center">
      <InfoIcon className="w-10 h-10 text-primary" />
      <Title order={2} className="my-2">
        Страница не найдена
      </Title>
      <p className="my-4 text-sm text-muted-foreground">
        Страница, которую вы ищете, не существует. Вот несколько полезных ссылок:
      </p>
      <div className="flex gap-2">
        <BackPageButton variant="outline">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Вернуться
        </BackPageButton>
        <Link href="/" className={cn(buttonVariants({}))}>
          На главную
        </Link>
      </div>
    </div>
  )
}
