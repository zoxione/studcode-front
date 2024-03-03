"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { useAddMemberTeamMutation } from "@/02-entities/team"
import { userAPI, userFormSchema } from "@/02-entities/user"

const addMemberFormSchema = userFormSchema.pick({ username: true })

interface AddMemberProps {
  teamName: string
}

const AddMember = ({ teamName }: AddMemberProps) => {
  const { mutate: addMember, status } = useAddMemberTeamMutation()

  const addMemberForm = useForm<z.infer<typeof addMemberFormSchema>>({
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(values: z.infer<typeof addMemberFormSchema>) {
    try {
      const user = await userAPI.getOne(values.username)
      if (user) {
        addMember({
          key: teamName,
          userId: user._id,
          role: "member",
        })
      }
    } catch (error) {
      toast.error("Пользователь не найден")
    }
  }

  return (
    <Form {...addMemberForm}>
      <form onSubmit={addMemberForm.handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
        <FormField
          control={addMemberForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="username" placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === "pending"}>
          {status === "pending" ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Добавить"}
        </Button>
      </form>
    </Form>
  )
}

export { AddMember }
