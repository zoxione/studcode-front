"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Textarea } from "@/01-shared/ui/Textarea"
import { Title } from "@/01-shared/ui/Title"
import { useGetAllTagsQuery } from "@/02-entities/tag"
import { MultiSelect, Option } from "@/01-shared/ui/MultiSelect"
import { editProjectFormSchema } from "../lib/edit-project-form-schema"

interface MainInfoSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectFormSchema>>
}

const MainInfoSection = ({ form }: MainInfoSectionProps) => {
  const { data: tags } = useGetAllTagsQuery({ limit: 1000, order: "name.ru" })
  const tagsItems: Option[] = tags?.results.map((tag) => ({ label: tag.name.ru, value: tag._id })) || []

  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Расскажите об проекте</Title>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Название</FormLabel>
              <FormControl>
                <Input type="text" id="title" placeholder="Мега крутой проект" {...field} />
              </FormControl>
              <FormDescription>Это публичное название вашего проекта</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="tagline">Слоган</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="tagline"
                  placeholder="Сервис по созданию чат-бота с искусственным интеллектом для поддержки клиентов."
                  {...field}
                />
              </FormControl>
              <FormDescription>Лаконичный и описательный слоган для проекта</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <Title order={5}>Ссылки</Title>
        <FormField
          control={form.control}
          name="source_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="source_link">Ссылка на проект</FormLabel>
              <FormControl>
                <Input type="url" id="source_link" placeholder="https://sample.com" {...field} />
              </FormControl>
              <FormDescription>Ссылка на публикацию проекта</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="github_link">Ссылка на исходный код</FormLabel>
              <FormControl>
                <Input type="url" id="github_link" placeholder="https://github.com" {...field} />
              </FormControl>
              <FormDescription>Ссылка на исходный код</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <Title order={5}>Описание</Title>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Описание</FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="Это краткое описание" {...field} />
              </FormControl>
              <FormDescription>Краткое описание проекта</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <Title order={5}>Теги</Title>
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="tags">Теги</FormLabel>
              <FormControl>
                <MultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={tagsItems}
                  placeholder="Выберите до трех тем"
                  emptyIndicator={<span className="text-center">Ничего не найдено</span>}
                />
              </FormControl>
              <FormDescription>Выберите до трех тем</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export { MainInfoSection }
