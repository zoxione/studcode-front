"use client"

import { HTMLAttributes } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { User } from "@/02-entities/user"
import { useEditUserAccount } from "../lib/use-edit-user-account"

interface EditUserAccountFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const EditUserAccountForm = ({ user }: EditUserAccountFormProps) => {
  const { editUserAccountForm, onSubmit, isLoading } = useEditUserAccount({ user })

  return (
    <Form {...editUserAccountForm}>
      <form onSubmit={editUserAccountForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={editUserAccountForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@ex.com" disabled {...field} />
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Обновить аккаунт"}
        </Button>
      </form>
    </Form>
  )
}

export { EditUserAccountForm }
