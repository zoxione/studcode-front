"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/Select"
import { useCallback } from "react"

interface SortProjectsProps {
  order: "title" | "flames"
}

const SortProjects = ({ order }: SortProjectsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleChangeValue = (value: string) => {
    router.push(pathname + "?" + createQueryString("order", value))
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
