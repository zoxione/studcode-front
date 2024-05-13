"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/01-shared/ui/command"
import { cn } from "@/01-shared/utils/cn"
import { ProjectCard } from "@/02-entities/project"
import { TagCardSmall } from "@/02-entities/tag/ui/tag-card-small/ui/tag-card-small"
import { VoteProjectButton } from "@/03-features/vote-project"
import { useSearch } from "../lib/use-search"

interface SearchDialogProps {
  className?: string
}

const SearchDialog = ({ className }: SearchDialogProps) => {
  const { openDialog, setOpenDialog, searchQuery, setSearchQuery, popularTags, projects, status } = useSearch({})

  return (
    <>
      <Button
        variant="outline"
        className={cn("md:w-40 lg:w-64 justify-start relative w-full", className)}
        onClick={() => setOpenDialog(true)}
      >
        <span className="">Поиск...</span>
        <kbd className="ml-auto h-5 pointer-events-none select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          Ctrl+K
        </kbd>
      </Button>
      <CommandDialog open={openDialog} onOpenChange={setOpenDialog} commandProps={{ shouldFilter: false }}>
        <CommandInput placeholder="Что ищем?" value={searchQuery} onValueChange={setSearchQuery} />
        <CommandList>
          {status === "pending" && searchQuery === "" ? (
            <CommandGroup heading="Популярные теги">
              <div className="grid grid-cols-3 gap-2">
                {popularTags?.map((tag) => (
                  <TagCardSmall key={tag._id} tag={tag} />
                ))}
              </div>
            </CommandGroup>
          ) : null}
          {status === "pending" && searchQuery !== "" ? (
            <CommandItem>
              <ReloadIcon className="h-4 w-4 animate-spin mx-auto " />
            </CommandItem>
          ) : null}
          {status === "success" && projects && projects.results.length === 0 ? (
            <CommandEmpty>
              {"(¬_¬)"}
              <br />
              Ничего не найдено.
            </CommandEmpty>
          ) : null}
          {status === "success" && projects && projects.results.length > 0 ? (
            <CommandGroup heading="Проекты">
              {projects.results.map((project) => (
                <CommandItem key={project._id} value={project._id}>
                  <ProjectCard
                    project={project}
                    actions={[
                      <VoteProjectButton
                        key="vote"
                        projectId={project._id}
                        flames={project.flames}
                        voted={project.voted}
                      />,
                    ]}
                    classNameWrapper="w-full"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { SearchDialog }
