"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { SearchIcon } from "lucide-react"

import { Button } from "@/01-shared/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/01-shared/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { ScrollArea } from "@/01-shared/ui/scroll-area"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"
import { ProjectCard } from "@/02-entities/project"
import { TagCardSmall } from "@/02-entities/tag/ui/tag-card-small"
import { useSearch } from "../lib/use-search"

interface SearchDialogProps {
  className?: string
}

const SearchDialog = ({ className }: SearchDialogProps) => {
  const { searchDialogForm, onSubmit, isLoading, popularTags, projects, status } = useSearch({})

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("md:w-40 lg:w-64 justify-start", className)}>
          Поиск...
          <SearchIcon className="ml-auto h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" withBackButton={false}>
        <Form {...searchDialogForm}>
          <form onSubmit={searchDialogForm.handleSubmit(onSubmit)} className="w-full flex flex-row items-center gap-2">
            <FormField
              control={searchDialogForm.control}
              name="query"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input type="searchDialog" placeholder="Что ищем?" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={status === "pending"}>
              {status === "pending" ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Поиск"}
            </Button>
          </form>
        </Form>
        {searchDialogForm.formState.isDirty ? (
          status === "pending" ? (
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
                {popularTags?.length && popularTags?.length > 0 ? (
                  popularTags?.map((tag) => <TagCardSmall key={tag._id} tag={tag} />)
                ) : (
                  <span className="col-span-3 text-sm text-muted-foreground flex justify-center items-center text-center">
                    {"(>_<)"} <br />
                    Теги не найдены.
                  </span>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { SearchDialog }
