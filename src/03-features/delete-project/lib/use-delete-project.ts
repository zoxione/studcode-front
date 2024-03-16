import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useDeleteOneProjectMutation } from "@/02-entities/project"

interface useDeleteProjectProps {
  projectId: string
}

const useDeleteProject = ({ projectId }: useDeleteProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: deleteProjectAsync } = useDeleteOneProjectMutation()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await deleteProjectAsync(projectId)
      toast.success("Проект удален")
      router.push(`/${session.user._id}/projects`)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleDelete,
    isLoading,
  }
}

export { useDeleteProject }
