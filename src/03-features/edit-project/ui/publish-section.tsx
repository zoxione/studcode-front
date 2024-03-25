"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/button"
import { Checkbox } from "@/01-shared/ui/checkbox"
import { Title } from "@/01-shared/ui/title"
import { editProjectSchema } from "../lib/edit-project-schema"
import { Project } from "@/02-entities/project"

interface PublishSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
  onSaveDraft: () => void
  isLoading: boolean
}

const PublishSection = ({ form, project, onSaveDraft, isLoading }: PublishSectionProps) => {
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
            <Checkbox checked={form.getValues().main_link !== ""} />
            Ссылка на проект
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
            <Checkbox checked={form.getValues().logo_file !== undefined || project.logo !== ""} />
            Логотип
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox
              checked={
                ((form.getValues().screenshots_files?.length || 0) > 0 &&
                  form.getValues().screenshots_files?.at(0) instanceof FileList) ||
                project.screenshots?.length > 0
              }
            />
            Скриншоты (хотя бы 1)
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Title order={5}>Дополнительная информация</Title>
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().github_link !== ""} />
            Ссылка на исходный код
          </label>
          <label className="flex items-center gap-2 text-sm font-medium leading-none">
            <Checkbox checked={form.getValues().youtube_link !== ""} />
            Ссылка на демонстрацию
          </label>
        </div>
      </div>

      <div className="space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Опубликовать"}
        </Button>
        <Button type="button" variant="outline" onClick={onSaveDraft} disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Сохранить в черновиках"}
        </Button>
      </div>
    </>
  )
}

export { PublishSection }
