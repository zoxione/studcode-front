"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash } from "lucide-react"

import { DropdownMenuItem } from "@/01-shared/ui/dropdown-menu"
import { useDeleteProject } from "../lib/use-delete-project"

interface DeleteProjectMenuItemProps {
  projectId: string
}

const DeleteProjectMenuItem = ({ projectId }: DeleteProjectMenuItemProps) => {
  const { handleDelete, isLoading } = useDeleteProject({ projectId })

  return (
    <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
      {isLoading ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <>
          Удалить
          <Trash className="ml-auto h-4 w-4" />
        </>
      )}
    </DropdownMenuItem>
  )
}

export { DeleteProjectMenuItem }
