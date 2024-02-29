"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { SearchIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/01-shared/ui/Dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { ScrollArea } from "@/01-shared/ui/ScrollArea"
import { Title } from "@/01-shared/ui/Title"
import { useDebounce } from "@/01-shared/utils/use-debounce"
import { ProjectCard, useGetAllProjectsQuery } from "@/02-entities/project"
import { useGetAllTagsQuery } from "@/02-entities/tag"
import { TagCardSmall } from "@/02-entities/tag/ui/tag-card-small"
import { cn } from "@/01-shared/utils/cn"

const searchFormSchema = z.object({
  query: z
    .string()
    .min(2, { message: "Минимальная длина запроса 2 символа" })
    .max(32, { message: "Максимальная длина запроса 32 символа" }),
})

interface SearchProps {
  className?: string
}

const Search = ({ className }: SearchProps) => {
  const { data: tags } = useGetAllTagsQuery({})

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  })

  const debouncedSearchQuery = useDebounce(searchForm.watch("query"), 200)

  const { data: projects, fetchStatus } = useGetAllProjectsQuery({ search: debouncedSearchQuery })

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("md:w-40 lg:w-64 justify-start", className)}>
          <SearchIcon className="mr-2 h-4 w-4" /> Поиск...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" withBackButton={false}>
        <Form {...searchForm}>
          <form onSubmit={searchForm.handleSubmit(onSubmit)} className="w-full flex flex-row items-center gap-2">
            <FormField
              control={searchForm.control}
              name="query"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input type="search" placeholder="Что ищем?" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={fetchStatus === "fetching"}>
              {fetchStatus === "fetching" ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
              Поиск
            </Button>
          </form>
        </Form>
        {searchForm.formState.isDirty ? (
          fetchStatus === "fetching" ? (
            <div>
              <Title order={6}>Поиск...</Title>
              <ScrollArea className="mt-2 w-full h-[280px]">
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => i + 1)
                    .map((index) => (
                      <ProjectCard key={index} loading />
                    ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="overflow-x-hidden">
              <Title order={6}>Результаты поиска</Title>
              <div className="mt-2 w-full h-[280px]">
                {projects?.results?.length && projects?.results?.length > 0 ? (
                  <div className="space-y-4">
                    {projects?.results.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">Ничего не найдено</div>
                )}
              </div>
            </div>
          )
        ) : (
          <div>
            <Title order={6}>Популярные теги</Title>
            <ScrollArea className="mt-2 w-full h-[280px]">
              <div className="grid grid-cols-3 gap-2">
                {tags?.results.map((tag) => (
                  <TagCardSmall key={tag._id} tag={tag} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { Search }
