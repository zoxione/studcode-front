"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction } from "react"

import { Button } from "@/01-shared/ui/button"
import { Checkbox } from "@/01-shared/ui/checkbox"
import { Title } from "@/01-shared/ui/title"
import { editProjectSchema } from "../lib/edit-project-schema"
import { Project } from "@/02-entities/project"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"

interface PublishSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
  onSaveDraft: () => void
  isLoading: boolean
  setCurrentSection: Dispatch<SetStateAction<number>>
}

const PublishSection = ({ form, project, onSaveDraft, isLoading, setCurrentSection }: PublishSectionProps) => {
  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Необходимая информация</Title>
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          <label
            onClick={() => setCurrentSection(0)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().title !== ""} />
            Название
          </label>
          <label
            onClick={() => setCurrentSection(0)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().tagline !== ""} />
            Слоган
          </label>
          <label
            onClick={() => setCurrentSection(0)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().main_link !== ""} />
            Ссылка на проект
          </label>
          <label
            onClick={() => setCurrentSection(0)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().description !== ""} />
            Описание
          </label>
          <label
            onClick={() => setCurrentSection(0)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().tags.length > 0} />
            Теги (хотя бы 1)
          </label>
          <label
            onClick={() => setCurrentSection(1)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().logo_file !== undefined || project.logo !== ""} />
            Логотип
          </label>
          <label
            onClick={() => setCurrentSection(1)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
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
          <label
            onClick={() => setCurrentSection(0)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().github_link !== ""} />
            Ссылка на исходный код
          </label>
          <label
            onClick={() => setCurrentSection(1)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().youtube_link !== ""} />
            Ссылка на видео
          </label>
          <label
            onClick={() => setCurrentSection(2)}
            className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
          >
            <Checkbox checked={form.getValues().team !== ""} />
            Команда
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Я подтверждаю, что являюсь правообладателем всех представленных медиа-файлов.</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <Button type="submit" disabled={isLoading || form.watch("confirm") !== true}>
            {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Опубликовать"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={isLoading || form.watch("confirm") !== true}
          >
            {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Сохранить в черновиках"}
          </Button>
        </div>
      </div>
    </>
  )
}

const PublishSectionLoading = () => {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-5 w-2/5" />
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          {Array(7)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-2/5" />
        <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
          {Array(3)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-52" />
        </div>
      </div>
    </>
  )
}

export { PublishSection, PublishSectionLoading }
