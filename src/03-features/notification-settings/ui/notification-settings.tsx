"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { User } from "@/02-entities/user"
import { Switch } from "@/01-shared/ui/Switch"

const notificationsFormSchema = z.object({
  email: z.string().email("Некорректная почта"),
  cancel_all: z.boolean().default(false).optional(),
})

interface NotificationSettingsProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const NotificationSettings = ({ user }: NotificationSettingsProps) => {
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      email: user?.email || "",
    },
  })

  function onSubmitNotificationsForm(values: z.infer<typeof notificationsFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...notificationsForm}>
      <form onSubmit={notificationsForm.handleSubmit(onSubmitNotificationsForm)} className="flex flex-col gap-4">
        <FormField
          control={notificationsForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Почта</FormLabel>
              <div className="flex flex-row items-center gap-2">
                <FormControl>
                  <Input type="email" placeholder="example@example.com" {...field} />
                </FormControl>
                <Button type="submit" className="self-center">
                  Сохранить почту
                </Button>
              </div>
              <FormDescription>Получайте уведомления на указанный адрес электронной почты.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={notificationsForm.control}
          name="cancel_all"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Отказаться от всех уведомлений</FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { NotificationSettings }
