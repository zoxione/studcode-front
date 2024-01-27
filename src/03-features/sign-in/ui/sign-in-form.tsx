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
import { useRouter } from "next/navigation"
import { userAPI } from "@/02-entities/user"

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
})

interface SignInFormProps extends HTMLAttributes<HTMLFormElement> {}

const SignInForm = ({ className }: SignInFormProps) => {
  const router = useRouter()

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { data: user, error } = await userAPI.login({ ...values })

    if (error === null) {
      toast.success("Вы вошли в аккаунт")
      router.push("/", { scroll: false })
      // window.location.reload()
    } else {
      toast.error("Произошла ошибка при авторизации")
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
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </Form>
  )
}

export { SignInForm }
