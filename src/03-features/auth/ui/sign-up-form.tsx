"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

import { Button } from "@/01-shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { userSchema } from "@/02-entities/user"
import { useRegisterMutation } from "@/03-features/auth"

const signUpSchema = userSchema.pick({ username: true, full_name: true, email: true, password: true })

interface SignUpFormProps extends HTMLAttributes<HTMLFormElement> {}

const SignUpForm = ({ className }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync: registerAsync } = useRegisterMutation()

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      full_name: {
        name: "",
        surname: "",
        patronymic: "",
      },
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setIsLoading(true)
      await registerAsync(values)
      await signIn("credentials", { ...values, redirect: true, callbackUrl: "/" })
    } catch (e) {
      toast.error("Произошла ошибка при регистрации")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={signUpForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="full_name.surname"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Иванов" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="full_name.name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Иван" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="full_name.patronymic"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Отчество (необязательно)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Иванович" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="e1x2a3m4p5l6e7" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-16" disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Регистрация...
            </>
          ) : (
            <>Зарегистрироваться</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { SignUpForm }
