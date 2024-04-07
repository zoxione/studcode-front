"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/radio-group"
import { Textarea } from "@/01-shared/ui/textarea"
import { useCreateTeam } from "../lib/use-create-team"
import { TEAM_STATUS_VALUES, prettyStatus } from "@/02-entities/team"

const CreateTeamForm = () => {
  const { createTeamForm, onSubmit, isLoading } = useCreateTeam({})

  return (
    <Form {...createTeamForm}>
      <form onSubmit={createTeamForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={createTeamForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Супер команда" {...field} />
              </FormControl>
              <FormDescription>Это публичное название вашей команды</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createTeamForm.control}
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
                  {TEAM_STATUS_VALUES.map((status) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={status}>
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal">{prettyStatus(status)}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createTeamForm.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Супер команда" rows={3} className="resize-y" {...field} />
              </FormControl>
              <FormDescription>Описание вашей команды</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Создать"}
        </Button>
      </form>
    </Form>
  )
}

export { CreateTeamForm }
