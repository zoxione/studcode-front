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
import { Badge } from "@/01-shared/ui/badge"

interface PublishSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
  onSaveDraft: () => void
  isLoading: boolean
  setCurrentSection: Dispatch<SetStateAction<number>>
}

interface FieldCheck {
  id: number
  name: keyof z.infer<typeof editProjectSchema>
  label: string
  section: number
  required: boolean
}

const PublishSection = ({ form, project, onSaveDraft, isLoading, setCurrentSection }: PublishSectionProps) => {
  console.log(form.getValues())

  const fields: FieldCheck[] = [
    { id: 0, name: "title", label: "Название", section: 0, required: true },
    { id: 1, name: "tagline", label: "Слоган", section: 0, required: true },
    { id: 2, name: "main_link", label: "Ссылка на проект", section: 0, required: true },
    { id: 3, name: "description", label: "Описание", section: 0, required: true },
    { id: 4, name: "tags", label: "Теги (хотя бы 1)", section: 0, required: true },
    { id: 5, name: "logo_file", label: "Логотип", section: 1, required: true },
    { id: 6, name: "screenshots_files", label: "Скриншоты (хотя бы 1)", section: 1, required: true },
    { id: 7, name: "github_link", label: "Ссылка на исходный код", section: 0, required: false },
    { id: 8, name: "youtube_link", label: "Ссылка на видео", section: 1, required: false },
    { id: 9, name: "team", label: "Команда", section: 2, required: false },
  ]
  const isCheck = (item: FieldCheck) =>
    form.getFieldState(item.name, form.formState).isTouched ||
    (typeof form.getValues(item.name) === "string" && form.getValues(item.name) !== "") ||
    (typeof form.getValues(item.name) === "object" && form.getValues(item.name)?.length > 0)

  const completedPercentReq =
    fields.filter((item) => item.required).reduce((sum, item) => (isCheck(item) ? sum + 1 : sum), 0) /
    fields.filter((item) => item.required).length
  const completedPercentNotReq =
    fields.filter((item) => !item.required).reduce((sum, item) => (isCheck(item) ? sum + 1 : sum), 0) /
    fields.filter((item) => !item.required).length

  return (
    <>
      <div className="space-y-4">
        <Title order={5}>
          Необходимая информация
          <Badge variant={completedPercentReq === 1 ? "default" : "secondary"} className="ml-2">
            {Math.round(completedPercentReq * 100)}% заполнено
          </Badge>
        </Title>
        <div className="grid sm:grid-rows-4 sm:grid-flow-col justify-start gap-y-4 gap-x-12 sm:gap-x-24">
          {fields
            .filter((item) => item.required)
            .map((item) => (
              <label
                key={item.id}
                onClick={() => setCurrentSection(item.section)}
                className={`flex items-center gap-2 text-sm font-medium leading-none cursor-pointer ${
                  form.getFieldState(item.name, form.formState).error ? "text-red-500" : ""
                }`}
              >
                <Checkbox checked={isCheck(item)} disabled />
                {item.label}
              </label>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <Title order={5}>
          Дополнительная информация
          <Badge variant={completedPercentNotReq === 1 ? "default" : "secondary"} className="ml-2">
            {Math.round(completedPercentNotReq * 100)}% заполнено
          </Badge>
        </Title>
        <div className="grid sm:grid-rows-4 sm:grid-flow-col justify-start gap-y-4 gap-x-12 sm:gap-x-24">
          {fields
            .filter((item) => !item.required)
            .map((item) => (
              <label
                key={item.id}
                onClick={() => setCurrentSection(item.section)}
                className={`flex items-center gap-2 text-sm font-medium leading-none cursor-pointer ${
                  form.getFieldState(item.name, form.formState).error ? "text-red-500" : ""
                }`}
              >
                <Checkbox checked={isCheck(item)} disabled />
                {item.label}
              </label>
            ))}
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
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button type="submit" disabled={isLoading || form.watch("confirm") !== true} className="w-full sm:w-fit">
            {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Опубликовать"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={isLoading || form.watch("confirm") !== true}
            className="w-full sm:w-fit"
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
