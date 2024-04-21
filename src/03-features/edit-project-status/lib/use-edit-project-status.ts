import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { PROJECT_STATUS_VALUES, Project, useUpdateOneProjectMutation } from "@/02-entities/project"

interface useEditProjectProps {
  project: Project
}

const useEditProjectStatus = ({ project }: useEditProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: updateProjectAsync } = useUpdateOneProjectMutation()

  const handleEditStatus = async (value: string) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      if (value === project.status) {
        return
      }
      if (
        project.title === "" ||
        project.tagline === "" ||
        project.links.every((link) => link.type !== "main") ||
        project.description === "" ||
        project.tags.length < 1 ||
        project.logo === "" ||
        project.screenshots.length < 1
      ) {
        toast.error("Заполните все обязательные поля")
        return
      }
      for (const status of PROJECT_STATUS_VALUES) {
        if (status === value) {
          await updateProjectAsync({ key: project._id, project: { status } })
          toast.success("Статус проекта обновлен")
          // router.push(`/${session.user._id}/projects`)
          break
        }
      }
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleEditStatus,
    isLoading,
  }
}

export { useEditProjectStatus }
