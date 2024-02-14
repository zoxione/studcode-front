"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Checkbox } from "@/01-shared/ui/Checkbox"
import { Title } from "@/01-shared/ui/Title"

import { editProjectFormSchema } from "./edit-project-form"

interface PublishSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectFormSchema>>
  onSaveDraft: () => void
}

const PublishSection = ({ form, onSaveDraft }: PublishSectionProps) => {
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
          {/*<label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().logo !== ""} />
                Логотип
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().screenshots.length > 0} />
                Скриншоты (хотя бы 1)
              </label> */}
        </div>
      </div>

      <div className="space-y-4">
        <Title order={5}>Дополнительная информация</Title>
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().source_link !== ""} />
            Другие ссылки
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().github_link !== ""} />
            Цены
          </label>
          {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().promo_code !== ""} />
                Промо-код
              </label> */}
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().demo_link !== ""} />
            YouTube видео
          </label>
          {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().team.length > 0} />
                Команда
              </label> */}
        </div>
      </div>

      <div className="space-x-2">
        <Button type="submit">Отправить</Button>
        <Button type="button" variant="outline" onClick={onSaveDraft}>
          Сохранить в черновиках
        </Button>
      </div>
    </>
  )
}

export { PublishSection }
