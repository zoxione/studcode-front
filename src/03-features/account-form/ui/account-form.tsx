"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { User, useUpdateOneByIdUserMutation } from "@/02-entities/user"

const accountFormSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
})

interface AccountFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const AccountForm = ({ user }: AccountFormProps) => {
  const { mutate: updateUser } = useUpdateOneByIdUserMutation()

  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
  })

  function onSubmitNotificationsForm(values: z.infer<typeof accountFormSchema>) {
    updateUser({
      id: user._id,
      user: { ...values },
    })
  }

  return (
    <Form {...accountForm}>
      <form onSubmit={accountForm.handleSubmit(onSubmitNotificationsForm)} className="space-y-4">
        <FormField
          control={accountForm.control}
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
          control={accountForm.control}
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

export { AccountForm }
