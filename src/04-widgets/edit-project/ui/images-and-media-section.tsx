"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Title } from "@/01-shared/ui/Title"

import { Dropzone } from "@/01-shared/ui/Dropzone"
import { ImageIcon } from "@radix-ui/react-icons"
import { ACCEPTED_IMAGE_TYPES } from "../data/constants"
import { editProjectFormSchema } from "./edit-project-form"

interface ImagesAndMediaSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectFormSchema>>
}

const ImagesAndMediaSection = ({ form }: ImagesAndMediaSectionProps) => {
  console.log("form", form.getValues())

  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Логотип</Title>
        <div className="flex flex-row items-center gap-6">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Dropzone
                    classNameWrapper="w-20 h-20"
                    accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                    dropContent={<ImageIcon className="h-6 w-6" />}
                    handleOnDrop={(acceptedFiles) => {
                      field.onChange(acceptedFiles)
                    }}
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
        <FormField
          control={form.control}
          name="screenshots"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Dropzone
                  classNameWrapper=""
                  accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                  multiple
                  dropContent={
                    <div className="flex flex-row items-center gap-4 py-8">
                      <ImageIcon className="h-8 w-8" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          Перетащите изображения сюда или нажмите, чтобы выбрать файлы
                        </span>
                        <span className="">
                          Рекомендуется разрешение 1270x760px или выше, размер не должен превышать 5 МБ.
                        </span>
                      </div>
                    </div>
                  }
                  handleOnDrop={(acceptedFiles) => {
                    field.onChange(acceptedFiles)
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <Title order={5}>YouTube видео</Title>
        <FormField
          control={form.control}
          name="demo_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="demo_link">Ссылка на видео </FormLabel>
              <FormControl>
                <Input type="url" id="demo_link" placeholder="https://www.youtube.com/" {...field} />
              </FormControl>
              <FormDescription>Ссылка на видео</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export { ImagesAndMediaSection }
