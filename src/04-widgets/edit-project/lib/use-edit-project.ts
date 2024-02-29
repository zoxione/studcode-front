import { useState } from "react"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { ProjectStatus, useUpdateOneByIdProjectMutation, useUploadsOneByIdProjectMutation } from "@/02-entities/project"
import { editProjectFormSchema } from "./edit-project-form-schema"

const useEditProject = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mutateAsync: updateProjectAsync } = useUpdateOneByIdProjectMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneByIdProjectMutation()

  const handleProject = async (
    projectId: string,
    projectSlug: string,
    values: z.infer<typeof editProjectFormSchema>,
    status: ProjectStatus,
    successMessage: string,
  ) => {
    try {
      setIsLoading(true)
      await updateProjectAsync({
        id: projectId,
        project: {
          title: values.title,
          tagline: values.tagline,
          status: status,
          description: values.description || "",
          links: {
            main: values.source_link,
            demo: values.demo_link,
            github: values.github_link || "",
          },
          price: values.price,
          tags: values.tags.map((tag) => tag.value),
        },
      })
      await uploadsFilesAsync({
        id: projectId,
        files: { logo_file: values.logo_file, screenshots_files: values.screenshots_files },
      })
      toast.success(successMessage)
      router.push(`/projects/${projectSlug}`)
    } catch (e) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async (
    projectId: string,
    projectSlug: string,
    values: z.infer<typeof editProjectFormSchema>,
  ) => {
    await handleProject(projectId, projectSlug, values, "published", "Проект опубликован")
  }

  const handleSaveDraft = async (
    projectId: string,
    projectSlug: string,
    values: z.infer<typeof editProjectFormSchema>,
  ) => {
    await handleProject(projectId, projectSlug, values, "draft", "Проект сохранен в черновик")
  }

  return { handlePublish, handleSaveDraft, isLoading }
}

export { useEditProject }
