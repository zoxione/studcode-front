"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { User, useUpdateOneUserMutation, userSchema } from "@/02-entities/user"

const editUserAccountSchema = userSchema.pick({ email: true, username: true })

interface EditUserAccountFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const EditUserAccountForm = ({ user }: EditUserAccountFormProps) => {
  const { mutate: updateUser } = useUpdateOneUserMutation()

  const editUserAccountForm = useForm<z.infer<typeof editUserAccountSchema>>({
    resolver: zodResolver(editUserAccountSchema),
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
  })

  function onSubmitNotificationsForm(values: z.infer<typeof editUserAccountSchema>) {
    updateUser({
      key: user._id,
      user: { ...values },
    })
  }

  return (
    <Form {...editUserAccountForm}>
      <form onSubmit={editUserAccountForm.handleSubmit(onSubmitNotificationsForm)} className="space-y-4">
        <FormField
          control={editUserAccountForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@ex.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editUserAccountForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="zoxione" disabled {...field} />
              </FormControl>
              <FormDescription>
                Это ваше публичное имя. Это может быть ваше настоящее имя или псевдоним. Вы можете изменять его только
                один раз в 30 дней.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Обновить аккаунт</Button>
      </form>
    </Form>
  )
}

export { EditUserAccountForm }
