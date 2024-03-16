"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash } from "lucide-react"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDeleteProject } from "../lib/use-delete-project"

interface DeleteProjectButtonProps extends ButtonProps {
  projectId: string
}

const DeleteProjectButton = ({ projectId, ...props }: DeleteProjectButtonProps) => {
  const { handleDelete, isLoading } = useDeleteProject({ projectId })

  return (
    <Button onClick={handleDelete} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  )
}

export { DeleteProjectButton }
