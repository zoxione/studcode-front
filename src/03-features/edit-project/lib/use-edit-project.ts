import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useSession } from "next-auth/react"

import {
  Project,
  ProjectFiles,
  ProjectStatus,
  useUpdateOneProjectMutation,
  useUploadsOneProjectMutation,
} from "@/02-entities/project"
import { editProjectSchema } from "./edit-project-schema"

interface useEditProjectProps {
  project: Project
}

const useEditProject = ({ project }: useEditProjectProps) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: updateProjectAsync } = useUpdateOneProjectMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneProjectMutation()

  const editProjectForm = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: project.title,
      tagline: project.tagline,
      type: project.type,
      description: project.description,
      main_link: project.links.find((link) => link.type === "main")?.url || "",
      github_link: project.links.find((link) => link.type === "github")?.url || "",
      youtube_link: project.links.find((link) => link.type === "youtube")?.url || "",
      price: project.price,
      tags: project.tags.map((tag) => ({ label: tag.name, value: tag._id })),
      team: project.team?._id || "",
    },
  })

  useEffect(() => {
    if (editProjectForm.formState.isSubmitted && Object.keys(editProjectForm.formState.errors).length > 0) {
      toast.error(`Введены некорректные данные: ${Object.keys(editProjectForm.formState.errors).join(", ")}`)
      console.error(editProjectForm.formState.errors)
    }
  }, [editProjectForm.formState.submitCount, editProjectForm.formState.errors])

  const handleProject = async (
    projectId: string,
    values: z.infer<typeof editProjectSchema>,
    status: ProjectStatus,
    successMessage: string,
    redirectUrl: string,
  ) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      if (values.logo_file || values.screenshots_files) {
        let files: ProjectFiles = {}
        if (values.logo_file) {
          files.logo_file = values.logo_file
        }
        if (values.screenshots_files) {
          files.screenshots_files = values.screenshots_files
        }
        await uploadsFilesAsync({
          key: projectId,
          files,
        })
      }
      await updateProjectAsync({
        key: projectId,
        project: {
          title: values.title,
          tagline: values.tagline,
          type: values.type,
          status: status,
          description: values.description,
          links: [
            { type: "github", label: "GitHub", url: values.github_link },
            { type: "main", label: "Main", url: values.main_link },
            { type: "youtube", label: "YouTube", url: values.youtube_link },
          ].filter((link) => link.url !== undefined && link.url !== "") as Project["links"],
          price: values.price,
          tags: values.tags.map((tag) => tag.value),
          team: values.team === "" ? null : values.team,
        },
      })
      toast.success(successMessage)
      router.push(redirectUrl)
    } catch (e) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async (values: z.infer<typeof editProjectSchema>) => {
    await handleProject(project._id, values, "published", "Проект опубликован", `/${session?.user.username}/projects`)
  }

  const handleSaveDraft = async (values: z.infer<typeof editProjectSchema>) => {
    await handleProject(project._id, values, "draft", "Проект сохранен в черновик", `/${session?.user.username}/drafts`)
  }

  return {
    editProjectForm,
    handlePublish,
    handleSaveDraft,
    isLoading,
    currentSection,
    setCurrentSection,
  }
}

export { useEditProject }
