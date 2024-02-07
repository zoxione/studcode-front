"use client"

import { UseFormReturn } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Title } from "@/01-shared/ui/Title"
import { newProjectFormSchema } from "./new-project"
import * as z from "zod"

interface ImagesAndMediaProps {
  form: UseFormReturn<z.infer<typeof newProjectFormSchema>>
}

const ImagesAndMedia = ({ form }: ImagesAndMediaProps) => {
  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Миниатюра</Title>
        {/* <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem> */}
        {/* <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Это краткое описание" {...field} />
                  </FormControl>
                  <FormDescription>Краткое описание проекта</FormDescription>
                  <FormMessage /> */}
        {/* </FormItem>
              )}
            /> */}
      </div>
      <div className="space-y-4">
        <Title order={5}>Скриншоты</Title>
        {/* <FormField
              control={form.control}
              name="screenshots"
              render={({ field }) => (
                <FormItem> */}
        {/* <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Это краткое описание" {...field} />
                  </FormControl>
                  <FormDescription>Краткое описание проекта</FormDescription>
                  <FormMessage /> */}
        {/* </FormItem>
              )}
            /> */}
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

export { ImagesAndMedia }
