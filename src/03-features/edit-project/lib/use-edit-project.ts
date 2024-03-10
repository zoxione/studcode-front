import { useState } from "react"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { ProjectStatus, useUpdateOneProjectMutation, useUploadsOneProjectMutation } from "@/02-entities/project"
import { editProjectSchema } from "../ui/edit-project-form"

const useEditProject = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mutateAsync: updateProjectAsync } = useUpdateOneProjectMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneProjectMutation()

  const handleProject = async (
    projectId: string,
    projectSlug: string,
    values: z.infer<typeof editProjectSchema>,
    status: ProjectStatus,
    successMessage: string,
  ) => {
    try {
      setIsLoading(true)
      await updateProjectAsync({
        key: projectId,
        project: {
          title: values.title,
          tagline: values.tagline,
          status: status,
          description: values.description || "",
          links: [
            { type: "github", label: "GitHub", url: values.github_link || "" },
            { type: "main", label: "Main", url: values.main_link },
            { type: "youtube", label: "YouTube", url: values.youtube_link || "" },
          ],
          price: values.price,
          tags: values.tags.map((tag) => tag.value),
        },
      })
      await uploadsFilesAsync({
        key: projectId,
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

  const handlePublish = async (projectId: string, projectSlug: string, values: z.infer<typeof editProjectSchema>) => {
    await handleProject(projectId, projectSlug, values, "published", "Проект опубликован")
  }

  const handleSaveDraft = async (projectId: string, projectSlug: string, values: z.infer<typeof editProjectSchema>) => {
    await handleProject(projectId, projectSlug, values, "draft", "Проект сохранен в черновик")
  }

  return { handlePublish, handleSaveDraft, isLoading }
}

export { useEditProject }
