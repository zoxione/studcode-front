"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { InfoIcon } from "lucide-react"

import { Button } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="h-full w-full max-w-sm mx-auto flex flex-col items-center justify-center text-center">
      <InfoIcon className="w-10 h-10 text-primary" />
      <Title order={2} className="my-2">
        Что-то пошло не так!
      </Title>
      <p className="my-4 text-sm text-muted-foreground">Возникла неизвестная ошибка. Пожалуйста, попробуйте еще раз.</p>
      <Button onClick={() => reset()}>
        <ReloadIcon className="w-4 h-4 mr-2" />
        Попробовать еще раз
      </Button>
    </div>
  )
}
