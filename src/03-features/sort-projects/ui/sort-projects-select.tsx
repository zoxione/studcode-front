"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/select"
import { useSortProjects } from "../lib/use-sort-projects"
import { GetAllProjectsFilter } from "@/02-entities/project"

interface SortProjectsSelectProps {
  order: GetAllProjectsFilter["order"]
}

const SortProjectsSelect = ({ order }: SortProjectsSelectProps) => {
  const { handleChangeValue } = useSortProjects({})

  return (
    <Select defaultValue={order} onValueChange={handleChangeValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Сортировать" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="title">По алфавиту</SelectItem>
        <SelectItem value="!flames">По голосам</SelectItem>
      </SelectContent>
    </Select>
  )
}

export { SortProjectsSelect }
