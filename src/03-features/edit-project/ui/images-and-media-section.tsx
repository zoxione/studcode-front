"use client"

import { ImageIcon, MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import * as z from "zod"

import { Fancybox } from "@/01-shared/lib/fancybox"
import { Button, buttonVariants } from "@/01-shared/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/01-shared/ui/carousel"
import { Dropzone } from "@/01-shared/ui/dropzone"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"
import { ACCEPTED_IMAGE_TYPES, Project } from "@/02-entities/project"
import { editProjectSchema } from "../lib/edit-project-schema"

interface ImagesAndMediaSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
}

const ImagesAndMediaSection = ({ form, project }: ImagesAndMediaSectionProps) => {
  const { fields, append, remove, update }: { fields: any; append: any; remove: any; update: any } = useFieldArray({
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
                    dropContent={
                      project.logo !== "" ? (
                        <img
                          src={project.logo}
                          alt={`${project.title}-logo`}
                          className="max-h-[200px] size-full aspect-square"
                        />
                      ) : (
                        <ImageIcon className="h-6 w-6" />
                      )
                    }
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
        {project.screenshots.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Текущие скриншоты</div>
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
              className=""
            >
              <Fancybox
                options={{
                  Carousel: {
                    infinite: false,
                  },
                }}
              >
                <CarouselContent className="">
                  {project.screenshots.map((screenshot: string) => (
                    <CarouselItem key={screenshot} className="w-fit basis-auto">
                      <a href={screenshot} data-fancybox="gallery">
                        <img key={screenshot} src={screenshot} className="h-20" alt={screenshot} />
                      </a>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Fancybox>
              <CarouselPrevious type="button" className="left-1 rounded-md" />
              <CarouselNext type="button" className="right-1 rounded-md" />
            </Carousel>
            <div className="text-sm">Всего: {project.screenshots.length}</div>
          </div>
        ) : null}
        <div className="space-y-2">
          <div>
            <span className="text-sm font-semibold">Изменить скриншоты (текущие скриншоты будут удалены)</span>
            <FormDescription>
              Добавьте скриншоты проекта (максимально 10). Видео скриншоты не поддерживаются.
            </FormDescription>
          </div>
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
                            classNameWrapper="h-64"
                            classNamePreview="object-contain aspect-video"
                            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                            onUpdate={(file) => {
                              update(index, file)
                            }}
                            preview
                            dropContent={
                              <>
                                <div className="flex flex-col items-center justify-center gap-4 p-6">
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
                              </>
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-4">
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
                item: function () {
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
              <FormLabel htmlFor="demo_link">Ссылка на видео</FormLabel>
              <FormControl>
                <Input type="url" id="demo_link" placeholder="https://www.youtube.com/" {...field} />
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

export { ImagesAndMediaSection }
