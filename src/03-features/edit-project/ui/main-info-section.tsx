"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { Textarea } from "@/01-shared/ui/textarea"
import { Title } from "@/01-shared/ui/title"
import { useGetAllTagsQuery } from "@/02-entities/tag"
import { MultiSelect, Option } from "@/01-shared/ui/multi-select"
import { editProjectSchema } from "../lib/edit-project-schema"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/radio-group"
import { PROJECT_TYPE_VALUES, prettyType } from "@/02-entities/project"

interface MainInfoSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
}

const MainInfoSection = ({ form }: MainInfoSectionProps) => {
  const { data: tags } = useGetAllTagsQuery({ limit: 1000, order: "name" })
  const tagsItems: Option[] = tags?.results.map((tag) => ({ label: tag.name, value: tag._id })) || []

  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Расскажите об проекте</Title>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Мега крутой проект" {...field} />
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
              <FormLabel>Слоган</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Сервис по созданию чат-бота с искусственным интеллектом для поддержки клиентов."
                  {...field}
                />
              </FormControl>
              <FormDescription>Лаконичный и описательный слоган для проекта</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Выберите тип проекта</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {PROJECT_TYPE_VALUES.map((type) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={type}>
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel className="font-normal">{prettyType(type).toLowerCase()}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <Title order={5}>Ссылки</Title>
        <FormField
          control={form.control}
          name="main_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на проект</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://sample.com" {...field} />
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
              <FormLabel>Ссылка на исходный код</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://github.com" {...field} />
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
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Это краткое описание" rows={5} className="resize-y" {...field} />
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
              <FormLabel>Теги</FormLabel>
              <FormControl>
                <MultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={tagsItems}
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
