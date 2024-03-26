"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/select"
import { Title } from "@/01-shared/ui/title"
import { Project } from "@/02-entities/project"
import { useGetAllTeamsQuery } from "@/02-entities/team"
import { editProjectSchema } from "../lib/edit-project-schema"

interface ExtrasSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
}

const ExtrasSection = ({ form, project }: ExtrasSectionProps) => {
  const { data: teams } = useGetAllTeamsQuery({ member_id: project.creator._id })

  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Цены</Title>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Выберите ценообразование</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="free" />
                    </FormControl>
                    <FormLabel className="font-normal">Бесплатно</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="free_options" />
                    </FormControl>
                    <FormLabel className="font-normal">Есть бесплатные опции</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="payment_required" />
                    </FormControl>
                    <FormLabel className="font-normal">Платно</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <Title order={5}>Команда</Title>
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Выберите команду, к которой будет привязан проект</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выбрать команду" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      field.onChange("")
                    }}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none text-muted-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    Без команды
                  </div>
                  {teams?.results.map((team) => (
                    <SelectItem key={team._id} value={team._id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export { ExtrasSection }
