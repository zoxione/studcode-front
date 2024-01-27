"use client"

import { Button } from "@/01-shared/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/01-shared/ui/Dialog"
import { Input } from "@/01-shared/ui/Input"
import { ScrollArea } from "@/01-shared/ui/ScrollArea"
import { Title } from "@/01-shared/ui/Title"
import { tagAPI } from "@/02-entities/tag"
import { TagCardSmall } from "@/02-entities/tag/ui/tag-card-small"
import { useQuery } from "@tanstack/react-query"
import { CopyIcon, SearchIcon } from "lucide-react"

const Search = () => {
  const { isPending, data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => tagAPI.getAll({}),
  })

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="md:w-[100px] lg:w-[300px] justify-start">
            <SearchIcon className="mr-2 h-4 w-4" /> Поиск...
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg" withBackButton={false}>
          <div className="w-full flex flex-row gap-2">
            <Input type="search" placeholder="Что ищем?" />
            <Button type="submit">Поиск</Button>
          </div>
          <div>
            <Title order={6}>Популярные теги</Title>
            <ScrollArea className="mt-2 w-full h-[200px]">
              <div className="grid grid-cols-3 gap-2">
                {tags?.data?.data.map((tag) => (
                  <TagCardSmall key={tag._id} tag={tag} />
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { Search }
