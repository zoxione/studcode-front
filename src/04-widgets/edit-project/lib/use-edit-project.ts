import { useState } from "react"
import * as z from "zod"
import { toast } from "sonner"

import { editProjectFormSchema } from "./edit-project-form-schema"

import { ProjectStatus, useUpdateOneByIdProjectMutation, useUploadsOneByIdProjectMutation } from "@/02-entities/project"
import { useRouter } from "next/navigation"

const useEditProject = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mutateAsync: updateProjectAsync } = useUpdateOneByIdProjectMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneByIdProjectMutation()

  const handleProject = async (
    projectId: string,
    values: z.infer<typeof editProjectFormSchema>,
    status: ProjectStatus,
    successMessage: string,
  ) => {
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

    setIsLoading(false)
    toast.success(successMessage)
    router.push(`/projects/${projectId}`)
  }

  const handlePublish = async (projectId: string, values: z.infer<typeof editProjectFormSchema>) => {
    await handleProject(projectId, values, "published", "Проект опубликован")
  }

  const handleSaveDraft = async (projectId: string, values: z.infer<typeof editProjectFormSchema>) => {
    await handleProject(projectId, values, "draft", "Проект сохранен в черновик")
  }

  return { handlePublish, handleSaveDraft, isLoading }
}

export { useEditProject }
