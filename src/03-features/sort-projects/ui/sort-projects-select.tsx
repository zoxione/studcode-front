"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/Select"
import { useSortProjects } from "../lib/use-sort-projects"

interface SortProjectsSelectProps {
  order: "title" | "flames"
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
        <SelectItem value="flames">По голосам</SelectItem>
      </SelectContent>
    </Select>
  )
}

export { SortProjectsSelect }
