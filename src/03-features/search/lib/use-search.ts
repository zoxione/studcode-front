import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useDebounce } from "@/01-shared/utils/use-debounce"
import { useGetAllProjectsQuery } from "@/02-entities/project"
import { useGetAllPopularTagsQuery } from "@/02-entities/tag"

const searchSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Минимальная длина запроса 1 символ." })
    .max(32, { message: "Максимальная длина запроса 32 символа." }),
})

interface useSearchProps {}

const useSearch = ({}: useSearchProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: popularTags } = useGetAllPopularTagsQuery()

  const searchDialogForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  })

  const debouncedSearchDialogQuery = useDebounce(searchDialogForm.watch("query"), 200)
  const { data: projects, status } = useGetAllProjectsQuery({
    search: debouncedSearchDialogQuery,
    status: "published",
  })

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      setIsLoading(true)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    searchDialogForm,
    onSubmit,
    isLoading,
    popularTags,
    projects,
    status,
  }
}

export { useSearch }
