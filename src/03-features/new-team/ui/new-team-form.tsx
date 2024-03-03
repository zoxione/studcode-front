"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { useCreateOneTeamMutation } from "@/02-entities/team"
import { teamFormSchema } from "@/02-entities/team"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/RadioGroup"
import { Textarea } from "@/01-shared/ui/Textarea"

const newTeamFormSchema = teamFormSchema.pick({ name: true, status: true, about: true })

const NewTeamForm = () => {
  const { data: session } = useSession()
  const { mutate: createTeam, status } = useCreateOneTeamMutation()

  const newTeamForm = useForm<z.infer<typeof newTeamFormSchema>>({
    resolver: zodResolver(newTeamFormSchema),
    defaultValues: {
      name: "",
      status: "opened",
      about: "",
    },
  })

  const onSubmit = (values: z.infer<typeof newTeamFormSchema>) => {
    if (!session) {
      toast.error("Вы не авторизованы")
      return
    }
    createTeam({
      name: values.name,
      status: values.status,
      about: values.about || "",
      members: [{ user: session.user._id, role: "owner" }],
    })
  }

  return (
    <Form {...newTeamForm}>
      <form onSubmit={newTeamForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={newTeamForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Название</FormLabel>
              <FormControl>
                <Input type="text" id="name" placeholder="Супер команда" {...field} />
              </FormControl>
              <FormDescription>Это публичное название вашей команды</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newTeamForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {[
                    { value: "opened", label: "Открытая" },
                    { value: "closed", label: "Закрытая" },
                  ].map(({ value, label }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={value}>
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newTeamForm.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="about">Описание</FormLabel>
              <FormControl>
                <Textarea id="about" placeholder="Супер команда" {...field} />
              </FormControl>
              <FormDescription>Описание вашей команды</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={status === "pending"}>
          {status === "pending" ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Создание...
            </>
          ) : (
            <>Создать</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { NewTeamForm }
