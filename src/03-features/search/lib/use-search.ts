import { useEffect, useState } from "react"

import { useDebounce } from "@/01-shared/utils/use-debounce"
import { useGetAllProjectsQuery } from "@/02-entities/project"
import { useGetAllPopularTagsQuery } from "@/02-entities/tag"

interface useSearchProps {}

const useSearch = ({}: useSearchProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: popularTags } = useGetAllPopularTagsQuery({ enabled: openDialog && searchQuery === "" })

  const debouncedSearchQuery = useDebounce(searchQuery, 200)
  const { data: projects, status } = useGetAllProjectsQuery({
    search: debouncedSearchQuery,
    status: "published",
    enabled: debouncedSearchQuery !== "",
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenDialog((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return {
    openDialog,
    setOpenDialog,
    searchQuery,
    setSearchQuery,
    popularTags,
    projects,
    status,
  }
}

export { useSearch }
