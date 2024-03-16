"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash } from "lucide-react"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDeleteTeam } from "../lib/use-delete-team"

interface DeleteTeamButtonProps extends ButtonProps {
  teamId: string
}

const DeleteTeamButton = ({ teamId, ...props }: DeleteTeamButtonProps) => {
  const { handleDelete, isLoading } = useDeleteTeam({ teamId })

  return (
    <Button onClick={handleDelete} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  )
}

export { DeleteTeamButton }
