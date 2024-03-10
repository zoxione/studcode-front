"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Form } from "@/01-shared/ui/Form"
import { Project, projectSchema } from "@/02-entities/project"
import { useEditProject } from "../lib/use-edit-project"
import { ExtrasSection } from "./extras-section"
import { ImagesAndMediaSection } from "./images-and-media-section"
import { MainInfoSection } from "./main-info-section"
import { PublishSection } from "./publish-section"

export const editProjectSchema = projectSchema.pick({
  title: true,
  tagline: true,
  description: true,
  main_link: true,
  github_link: true,
  youtube_link: true,
  logo_file: true,
  screenshots_files: true,
  price: true,
  tags: true,
})

interface EditProjectFormProps {
  project: Project
}

const EditProjectForm = ({ project }: EditProjectFormProps) => {
  const [currentSection, setCurrentSection] = useState(0)
  const { handlePublish, handleSaveDraft, isLoading } = useEditProject()

  const editProjectForm = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: project.title,
      tagline: project.tagline,
      description: project.description,
      main_link: project.links.find((link) => link.type === "main")?.url || "",
      github_link: project.links.find((link) => link.type === "github")?.url || "",
      youtube_link: project.links.find((link) => link.type === "youtube")?.url || "",
      logo_file: [],
      screenshots_files: [],
      price: project.price,
      tags: project.tags.map((tag) => ({ label: tag.name, value: tag._id })),
    },
  })

  useEffect(() => {
    if (editProjectForm.formState.isSubmitted && Object.keys(editProjectForm.formState.errors).length > 0) {
      toast.error("Введены некорректные данные")
      console.error(editProjectForm.formState.errors)
    }
  }, [editProjectForm.formState.submitCount, editProjectForm.formState.errors])

  const sections = [
    {
      title: "Основная информация",
      content: <MainInfoSection form={editProjectForm} />,
    },
    {
      title: "Изображения и медиа",
      content: <ImagesAndMediaSection form={editProjectForm} />,
    },
    {
      title: "Дополнительно",
      content: <ExtrasSection form={editProjectForm} />,
    },
    {
      title: "Публикация",
      content: (
        <PublishSection
          form={editProjectForm}
          onSaveDraft={() => handleSaveDraft(project._id, project.slug, editProjectForm.getValues())}
          isLoading={isLoading}
        />
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16 h-full">
      <aside className="flex flex-col gap-2 lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px-116px)]">
        {sections.map((section, index) => (
          <Button
            key={section.title}
            variant={currentSection === index ? "default" : "ghost"}
            size="lg"
            className="justify-start px-4"
            onClick={() => {
              setCurrentSection(index)
            }}
          >
            {section.title}
          </Button>
        ))}
      </aside>
      <section className="col-span-1 lg:col-span-3 h-full">
        <Form {...editProjectForm}>
          <form
            onSubmit={editProjectForm.handleSubmit((values: z.infer<typeof editProjectSchema>) =>
              handlePublish(project._id, project.slug, values),
            )}
            className="space-y-8 mb-8"
          >
            {sections[currentSection].content}
          </form>
        </Form>
      </section>
    </div>
  )
}

export { EditProjectForm }
