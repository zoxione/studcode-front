"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/Select"
import { useRouter } from "next/navigation"

interface SortProjectsProps {
  order: "votes" | "alphabet"
}

const SortProjects = ({ order }: SortProjectsProps) => {
  const router = useRouter()

  const handleChangeValue = (value: string) => {
    router.push("?order=" + value, { scroll: false })
  }

  return (
    <Select defaultValue={order} onValueChange={handleChangeValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Сортировать" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="votes">По голосам</SelectItem>
        <SelectItem value="alphabet">По алфавиту</SelectItem>
      </SelectContent>
    </Select>
  )
}

export { SortProjects }
