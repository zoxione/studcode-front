"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Input } from "@/01-shared/ui/Input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Button } from "@/01-shared/ui/Button"
import { useCreateOneProjectMutation } from "@/02-entities/project"
import { useSession } from "@/03-features/auth"

const newProjectFormSchema = z.object({
  title: z.string().min(3, { message: "Название проекта должно содержать не менее 3 символов" }).max(32, {
    message: "Название проекта должно содержать не более 32 символов",
  }),
})

const NewProjectForm = () => {
  const { data: session } = useSession()
  const { mutate: createProject } = useCreateOneProjectMutation()

  const newProjectForm = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = (values: z.infer<typeof newProjectFormSchema>) => {
    if (!session) {
      toast.error("Вы не авторизованы")
      return
    }
    createProject({
      title: values.title,
      creator: session.sub,
    })
  }

  return (
    <Form {...newProjectForm}>
      <form onSubmit={newProjectForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={newProjectForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="catgram" {...field} />
              </FormControl>
              <FormDescription>Это общедоступное отображаемое название проекта.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Создать
        </Button>
      </form>
    </Form>
  )
}

export { NewProjectForm }
