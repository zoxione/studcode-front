"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash2Icon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/01-shared/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/01-shared/ui/alert-dialog"
import { useDeleteOneProjectMutation } from "../api/project-hooks"

interface DeleteProjectButtonProps {
  project_id: string
}

const DeleteProjectButton = ({ project_id }: DeleteProjectButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: deleteProjectAsync } = useDeleteOneProjectMutation()

  const handleButton = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await deleteProjectAsync(project_id)
      toast.success("Проект удален")
      router.push(`/${session.user._id}/projects`)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
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
          <Button onClick={handleButton} variant="destructive" disabled={isLoading}>
            {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Удалить"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteProjectButton }
