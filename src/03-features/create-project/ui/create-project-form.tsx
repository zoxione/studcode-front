"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { useCreateProject } from "../lib/use-create-project"

const CreateProjectForm = () => {
  const { createProjectForm, onSubmit, isLoading } = useCreateProject({})

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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Создать"}
        </Button>
      </form>
    </Form>
  )
}

export { CreateProjectForm }
