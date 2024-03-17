"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDeleteTeam } from "../lib/use-delete-team"

interface DeleteTeamButtonProps extends ButtonProps {
  teamId: string
}

const DeleteTeamButton = ({ teamId, ...props }: DeleteTeamButtonProps) => {
  const { handleDelete, isLoading } = useDeleteTeam({ teamId })

  return (
    <Button onClick={handleDelete} variant="destructive" disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Удалить"}
    </Button>
  )
}

export { DeleteTeamButton }
