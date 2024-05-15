"use client"

import { HTMLAttributes } from "react"
import { CheckCircledIcon, InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { User } from "@/02-entities/user"
import { useEditUserAccount } from "../lib/use-edit-user-account"
import { VerifyEmailUserButton } from "@/03-features/verify-email-user"

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
              <FormLabel>Электронная почта (нельзя изменить)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@ex.com" disabled {...field} />
              </FormControl>
              <FormMessage />
              <div>
                {user.verify_email === "true" ? (
                  <FormDescription className="flex items-center gap-2">
                    <CheckCircledIcon className="h-4 w-4 text-green-500" />
                    <span>Почта подтверждена</span>
                  </FormDescription>
                ) : (
                  <div className="flex items-center gap-4">
                    <FormDescription className="flex items-center gap-2">
                      <InfoCircledIcon className="h-4 w-4 text-yellow-500" />
                      <span>Почта не подтверждена</span>
                    </FormDescription>
                    <VerifyEmailUserButton />
                  </div>
                )}
              </div>
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
                <Input type="text" placeholder="zoxione" {...field} />
              </FormControl>
              <FormDescription>
                Это ваше публичное имя пользователя, которое может быть вашим настоящим именем или псевдонимом.
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
