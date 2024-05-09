"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"
import { InfoIcon } from "lucide-react"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/select"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { Title } from "@/01-shared/ui/title"
import { PROJECT_PRICE_VALUES, Project, prettyPrice } from "@/02-entities/project"
import { useGetAllTeamsQuery } from "@/02-entities/team"
import { editProjectSchema } from "../lib/edit-project-schema"

interface ExtrasSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectSchema>>
  project: Project
}

const ExtrasSection = ({ form, project }: ExtrasSectionProps) => {
  const { data: teams, status } = useGetAllTeamsQuery({ member_id: project.creator._id })

  if (status === "pending") {
    return <ExtrasSectionLoading />
  }

  if (status === "error") {
    return (
      <div className="flex flex-col justify-center items-center">
        <InfoIcon className="w-6 h-6 text-primary" />
        <p className="text-sm text-muted-foreground">Возникла неизвестная ошибка.</p>
      </div>
    )
  }

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
                  {PROJECT_PRICE_VALUES.map((price) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={price}>
                      <FormControl>
                        <RadioGroupItem value={price} />
                      </FormControl>
                      <FormLabel className="font-normal">{prettyPrice(price)}</FormLabel>
                    </FormItem>
                  ))}
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
                  {teams?.results?.map((team) => (
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

const ExtrasSectionLoading = () => {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-7 w-2/5" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-2/6" />
          <div className="gap-2 flex flex-col space-y-1">
            {Array(7)
              .fill(0)
              .map((_, i) => i + 1)
              .map((index) => (
                <div key={index} className="flex items-center space-x-3 space-y-0">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-3/12" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-2/5" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-2/6" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </>
  )
}

export { ExtrasSection, ExtrasSectionLoading }
