"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { projectSchema, useCreateOneProjectMutation } from "@/02-entities/project"

const createProjectSchema = projectSchema.pick({ title: true })

const CreateProjectForm = () => {
  const { data: session } = useSession()
  const { mutate: createProject, status } = useCreateOneProjectMutation()

  const createProjectForm = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    if (!session) {
      toast.error("Вы не авторизованы")
      return
    }
    createProject({
      title: values.title,
      creator: session.user._id,
    })
  }

  return (
    <Form {...createProjectForm}>
      <form onSubmit={createProjectForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={createProjectForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="catgram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={status === "pending"}>
          {status === "pending" ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Создание...
            </>
          ) : (
            <>Создать</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { CreateProjectForm }
