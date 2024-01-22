"use client"

import { HTMLAttributes } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { cn } from "@/01-shared/utils/cn"
import { toast } from "sonner"

const singInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
})

interface SignInFormProps extends HTMLAttributes<HTMLFormElement> {}

const SignInForm = ({ className }: SignInFormProps) => {
  const form = useForm<z.infer<typeof singInFormSchema>>({
    resolver: zodResolver(singInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof singInFormSchema>) {
    console.log(values)

    const res = await fetch(`${process.env.API_URL}/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    console.log(res)

    if (res.ok) {
      toast.success("Вы вошли в аккаунт")
    } else {
      toast.error("Произошла ошибка при авторизации")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
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
          control={form.control}
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
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </Form>
  )
}

export { SignInForm }
