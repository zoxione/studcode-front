"use client"

import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/Select"

interface SortProjectsProps {
  order: "title" | "flames"
}

const SortProjects = ({ order }: SortProjectsProps) => {
  const router = useRouter()

  const handleChangeValue = (value: string) => {
    router.push("?order=" + value)
  }

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

export { SortProjects }
