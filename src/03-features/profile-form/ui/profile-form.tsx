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

const profileFormSchema = z.object({
  full_name: fullNameSchema,
  about: z.string().optional(),
})

interface ProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const { mutate: updateUser } = useUpdateOneByIdUserMutation()

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: {
        name: user?.full_name.name || "",
        surname: user?.full_name.surname || "",
        patronymic: user?.full_name.patronymic || "",
      },
      about: user?.about || "",
    },
  })

  function onSubmitNotificationsForm(values: z.infer<typeof profileFormSchema>) {
    updateUser({
      id: user._id,
      user: { ...values },
    })
  }

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmitNotificationsForm)} className="space-y-4">
        <FormField
          control={profileForm.control}
          name="full_name.surname"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваша фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name="full_name.name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name="full_name.patronymic"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Отчество</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваше отчество" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profileForm.control}
          name="about"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>О себе</FormLabel>
              <FormControl>
                <Textarea placeholder="Расскажи нам немного о себе" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Обновить профиль</Button>
      </form>
    </Form>
  )
}

export { ProfileForm }
