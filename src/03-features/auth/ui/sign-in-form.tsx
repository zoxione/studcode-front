"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { userSchema } from "@/02-entities/user"

const signInSchema = userSchema.pick({ email: true, password: true })

interface SignInFormProps extends HTMLAttributes<HTMLFormElement> {}

const SignInForm = ({ className }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      setIsLoading(true)
      const res = await signIn("credentials", { ...values, redirect: false })
      if (!res?.ok) {
        toast.error("Неверная электронная почта или пароль")
      } else {
        toast.success("Вы вошли в аккаунт")
        router.push("/")
      }
    } catch (e) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={signInForm.control}
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
          control={signInForm.control}
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Вход...
            </>
          ) : (
            <>Войти</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { SignInForm }
