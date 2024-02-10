"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Textarea } from "@/01-shared/ui/Textarea"
import { User, useUpdateOneByIdUserMutation } from "@/02-entities/user"

const fullNameSchema = z.object({
  surname: z.string().optional(),
  name: z.string().optional(),
  patronymic: z.string().optional(),
})

const myDetailsFormSchema = z.object({
  full_name: fullNameSchema,
  username: z.string().optional(),
  about: z.string().optional(),
})

interface MyDetailsProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const MyDetails = ({ user }: MyDetailsProps) => {
  const { mutate: updateUser } = useUpdateOneByIdUserMutation()

  const myDetailsForm = useForm<z.infer<typeof myDetailsFormSchema>>({
    resolver: zodResolver(myDetailsFormSchema),
    defaultValues: {
      full_name: {
        name: user?.full_name.name || "",
        surname: user?.full_name.surname || "",
        patronymic: user?.full_name.patronymic || "",
      },
      username: user?.username || "",
      about: user?.about || "",
    },
  })

  function onSubmitNotificationsForm(values: z.infer<typeof myDetailsFormSchema>) {
    updateUser({
      id: user._id,
      user: { ...values },
    })
  }

  return (
    <Form {...myDetailsForm}>
      <form onSubmit={myDetailsForm.handleSubmit(onSubmitNotificationsForm)} className="space-y-4">
        <FormField
          control={myDetailsForm.control}
          name="full_name.surname"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={myDetailsForm.control}
          name="full_name.name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={myDetailsForm.control}
          name="full_name.patronymic"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Отчество</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Отчество" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={myDetailsForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Имя пользователя" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={myDetailsForm.control}
          name="about"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>О себе</FormLabel>
              <FormControl>
                <Textarea placeholder="О себе" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  )
}

export { MyDetails }
