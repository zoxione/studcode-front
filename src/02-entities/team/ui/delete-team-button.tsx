"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/01-shared/ui/AlertDialog"
import { Button } from "@/01-shared/ui/Button"
import { useDeleteOneTeamMutation } from "../api/team-hooks"

interface DeleteTeamButtonProps {
  id: string
}

const DeleteTeamButton = ({ id }: DeleteTeamButtonProps) => {
  const { mutate: deleteTeam, status } = useDeleteOneTeamMutation()

  const handleButton = () => {
    deleteTeam(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Удалить</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить команду?</AlertDialogTitle>
          <AlertDialogDescription>
            Команда будет удалена безвозвратно. Это действие нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрыть</AlertDialogCancel>
          <Button onClick={handleButton} variant="destructive" disabled={status === "pending"}>
            {status === "pending" ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Удалить"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteTeamButton }
