"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Checkbox } from "@/01-shared/ui/Checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/01-shared/ui/Form"
import { User } from "@/02-entities/user"

const privacyFormSchema = z.object({
  awards_received: z.boolean().optional(),
  my_profile: z.boolean().optional(),
})

interface PrivacySettingsProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const PrivacySettings = ({ user }: PrivacySettingsProps) => {
  const privacyForm = useForm<z.infer<typeof privacyFormSchema>>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      awards_received: false,
      my_profile: false,
    },
  })

  function onSubmitNotificationsForm(values: z.infer<typeof privacyFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...privacyForm}>
      <form onSubmit={privacyForm.handleSubmit(onSubmitNotificationsForm)} className="flex flex-col gap-4">
        <FormField
          control={privacyForm.control}
          name="awards_received"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Скрыть полученные награды</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={privacyForm.control}
          name="my_profile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Скрыть мой профиль</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6 w-fit">
          Сохранить изменения
        </Button>
      </form>
    </Form>
  )
}

export { PrivacySettings }
