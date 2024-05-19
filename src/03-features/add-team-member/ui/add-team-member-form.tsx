"use client"

import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons"
import { Contact2Icon } from "lucide-react"

import { Button } from "@/01-shared/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/01-shared/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/01-shared/ui/popover"
import { cn } from "@/01-shared/utils/cn"
import { useAddTeamMember } from "../lib/use-add-team-member"
import { SpecializationBadge } from "@/02-entities/specialization"

interface AddTeamMemberFormProps {
  teamName: string
}

const AddTeamMemberForm = ({ teamName }: AddTeamMemberFormProps) => {
  const { addTeamMemberForm, onSubmit, isLoading, searchQuery, setSearchQuery, users } = useAddTeamMember({ teamName })

  return (
    <Form {...addTeamMemberForm}>
      <form onSubmit={addTeamMemberForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormLabel>Добавить пользователя</FormLabel>
        <FormField
          control={addTeamMemberForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                      >
                        {addTeamMemberForm.watch("username") !== ""
                          ? addTeamMemberForm.watch("username")
                          : "Выберите пользователя"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        placeholder="Поиск пользователя..."
                        className="h-9"
                      />
                      <CommandEmpty>Пользователь не найден</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            className="gap-2"
                            value={user.username}
                            key={user.username}
                            onSelect={() => {
                              addTeamMemberForm.setValue("username", user.username)
                            }}
                          >
                            <Popover>
                              <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="outline" size="icon">
                                  <Contact2Icon className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-fit flex flex-col gap-1">
                                {user.specializations?.length > 0 ? (
                                  user.specializations.map((spec) => (
                                    <SpecializationBadge key={spec._id} specialization={spec} />
                                  ))
                                ) : (
                                  <span className="text-sm text-muted-foreground">Ничего нет.</span>
                                )}
                              </PopoverContent>
                            </Popover>
                            {user.username}
                            <CheckIcon
                              className={cn(
                                "shrink-0 ml-auto h-4 w-4",
                                user.username === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Добавить"}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>Отправляет приглашение в команду на электронную почту.</FormDescription>
      </form>
    </Form>
  )
}

export { AddTeamMemberForm }
