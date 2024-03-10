"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/Button"
import { Checkbox } from "@/01-shared/ui/Checkbox"
import { Title } from "@/01-shared/ui/Title"
import { editProjectSchema } from "./edit-project-form"

interface PublishSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  onSaveDraft: () => void
  isLoading: boolean
}

const PublishSection = ({ form, onSaveDraft, isLoading }: PublishSectionProps) => {
  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Необходимая информация</Title>
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().title !== ""} />
            Название
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().tagline !== ""} />
            Слоган
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().description !== ""} />
            Описание
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().tags.length > 0} />
            Теги (хотя бы 1)
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().logo_file !== ""} />
            Логотип
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().screenshots_files.length > 0} />
            Скриншоты (хотя бы 1)
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Title order={5}>Дополнительная информация</Title>
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().main_link !== ""} />
            Другие ссылки
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().github_link !== ""} />
            Цены
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().youtube_link !== ""} />
            YouTube видео
          </label>
        </div>
      </div>

      <div className="space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Публикация...
            </>
          ) : (
            <>Опубликовать</>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onSaveDraft} disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>Сохранить в черновиках</>
          )}
        </Button>
      </div>
    </>
  )
}

export { PublishSection }
