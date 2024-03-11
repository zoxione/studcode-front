"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { useAddTeamMember } from "../lib/use-add-team-member"

interface AddTeamMemberFormProps {
  teamName: string
}

const AddTeamMemberForm = ({ teamName }: AddTeamMemberFormProps) => {
  const { addTeamMemberForm, onSubmit, isLoading } = useAddTeamMember({ teamName })

  return (
    <Form {...addTeamMemberForm}>
      <form onSubmit={addTeamMemberForm.handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
        <FormField
          control={addTeamMemberForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="username" placeholder="Имя пользователя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Добавить"}
        </Button>
      </form>
    </Form>
  )
}

export { AddTeamMemberForm }
