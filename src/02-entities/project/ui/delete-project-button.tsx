"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash2Icon } from "lucide-react"


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

import { useDeleteOneByIdProjectMutation } from "../api/project-hooks"

interface DeleteProjectButtonProps {
  id: string
}

const DeleteProjectButton = ({ id }: DeleteProjectButtonProps) => {
  const { mutate: deleteProject, status } = useDeleteOneByIdProjectMutation()

  const handleButton = () => {
    deleteProject(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
          <AlertDialogDescription>
            Проект будет удален безвозвратно. Это действие нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрыть</AlertDialogCancel>
          <Button onClick={handleButton} variant="destructive" disabled={status === "pending"}>
            {status === "pending" ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Удаление...
              </>
            ) : (
              <>Удалить</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteProjectButton }
