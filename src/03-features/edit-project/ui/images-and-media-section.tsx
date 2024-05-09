"use client"

import { ChevronDownIcon, ChevronUpIcon, ImageIcon, MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import * as z from "zod"

import { Fancybox } from "@/01-shared/lib/fancybox"
import { Button, buttonVariants } from "@/01-shared/ui/button"
import { Dropzone } from "@/01-shared/ui/dropzone"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"
import { ACCEPTED_IMAGE_TYPES, Project } from "@/02-entities/project"
import { editProjectSchema } from "../lib/edit-project-schema"
import { Skeleton } from "@/01-shared/ui/skeleton"

interface ImagesAndMediaSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
}

const ImagesAndMediaSection = ({ form, project }: ImagesAndMediaSectionProps) => {
  const { fields, append, remove, update, swap } = useFieldArray({
    name: "screenshots_files",
    control: form.control,
  })

  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Логотип</Title>
        <div className="flex flex-row items-center gap-6">
          <FormField
            control={form.control}
            name="logo_file"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Dropzone
                    classNameWrapper="w-20 h-20"
                    accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                    preview
                    classNamePreview="size-full aspect-square object-cover"
                    dropContent={<ImageIcon className="h-6 w-6" />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col text-sm">
            <span>Разрешенные форматы: JPG, JPEG, PNG, WEBP.</span>
            <span>Максимальный размер: 5 МБ.</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Title order={5}>Скриншоты</Title>
        <div className="space-y-2">
          <FormLabel>Добавьте скриншоты проекта (максимально 10). Видео скриншоты не поддерживаются.</FormLabel>
          <Fancybox
            className="space-y-2"
            options={{
              Carousel: {
                infinite: false,
              },
            }}
          >
            {fields.map((field: any, index: number) => (
              <div key={field.id} className="space-y-2">
                <div className="flex flex-row items-center gap-4 max-w-xl">
                  <FormField
                    control={form.control}
                    name={`screenshots_files.${index}`}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormControl>
                          <Dropzone
                            classNamePreview="object-contain aspect-video"
                            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                            onUpdate={(file) => {
                              update(index, file)
                            }}
                            preview
                            dropContent={
                              <div className="flex flex-col items-center justify-center gap-4 p-6 aspect-video">
                                <ImageIcon className="shrink-0 h-8 w-8" />
                                <div className="flex flex-col gap-1 text-center">
                                  <span className="font-medium text-sm">
                                    Перетащите изображения сюда или нажмите, чтобы выбрать файлы
                                  </span>
                                  <span className="">
                                    Рекомендуется разрешение 1270x760px или выше, размер не должен превышать 5 МБ.
                                  </span>
                                </div>
                              </div>
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-1">
                    <Button
                      onClick={() => swap(index, index - 1)}
                      disabled={index === 0}
                      type="button"
                      variant="outline"
                      size="icon"
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                    </Button>
                    {field[0] ? (
                      <a
                        href={URL.createObjectURL(field[0])}
                        data-fancybox="gallery"
                        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
                      >
                        <MagnifyingGlassIcon className="h-4 w-4" />
                      </a>
                    ) : null}
                    <Button onClick={() => remove(index)} type="button" variant="destructive" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => swap(index, index + 1)}
                      disabled={index === fields.length - 1}
                      type="button"
                      variant="outline"
                      size="icon"
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Fancybox>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={fields.length >= 10}
            onClick={() =>
              append({
                length: 0,
                item: () => {
                  return null
                },
              })
            }
          >
            Добавить скриншот
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <Title order={5}>YouTube видео</Title>
        <FormField
          control={form.control}
          name="youtube_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на видео</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://www.youtube.com/" {...field} />
              </FormControl>
              <FormDescription>Демонстрация работы</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

const ImagesAndMediaSectionLoading = () => {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-7 w-2/5" />
        <div className="flex items-center gap-6">
          <Skeleton className="h-20 w-20 shrink-0" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="h-5 w-3/6" />
            <Skeleton className="h-5 w-3/6" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-2/5" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-4/5" />
          {Array(3)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => (
              <div key={index} className="flex flex-row items-center gap-4 max-w-xl">
                <Skeleton className="h-72 aspect-video" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            ))}
        </div>
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-2/5" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/6" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>
    </>
  )
}

export { ImagesAndMediaSection, ImagesAndMediaSectionLoading }
