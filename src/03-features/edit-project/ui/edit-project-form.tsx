"use client"

import * as z from "zod"
import { CheckCircledIcon, ImageIcon, PlusCircledIcon, TextAlignRightIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/button"
import { Form } from "@/01-shared/ui/form"
import { Project } from "@/02-entities/project"
import { useEditProject } from "../lib/use-edit-project"
import { ExtrasSection } from "./extras-section"
import { ImagesAndMediaSection } from "./images-and-media-section"
import { MainInfoSection } from "./main-info-section"
import { PublishSection } from "./publish-section"
import { editProjectSchema } from "../lib/edit-project-schema"
import { ScrollArea, ScrollBar } from "@/01-shared/ui/scroll-area"

interface EditProjectFormProps {
  project: Project
}

const EditProjectForm = ({ project }: EditProjectFormProps) => {
  const { editProjectForm, handlePublish, handleSaveDraft, isLoading, currentSection, setCurrentSection } =
    useEditProject({ project })

  const sections = [
    {
      title: "Основная информация",
      icon: <TextAlignRightIcon className="w-4 h-4" />,
      content: <MainInfoSection form={editProjectForm} />,
    },
    {
      title: "Изображения и медиа",
      icon: <ImageIcon className="w-4 h-4" />,
      content: <ImagesAndMediaSection form={editProjectForm} project={project} />,
    },
    {
      title: "Дополнительно",
      icon: <PlusCircledIcon className="w-4 h-4" />,
      content: <ExtrasSection form={editProjectForm} />,
    },
    {
      title: "Публикация",
      icon: <CheckCircledIcon className="w-4 h-4" />,
      content: (
        <PublishSection
          form={editProjectForm}
          project={project}
          onSaveDraft={() => handleSaveDraft(project._id, project.slug, editProjectForm.getValues())}
          isLoading={isLoading}
        />
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16">
      <aside className="flex flex-col gap-2 lg:sticky lg:top-[90px] lg:h-fit">
        <nav>
          <ScrollArea>
            <div className="flex lg:flex-col gap-2 py-3 lg:py-0">
              {sections.map((section, index) => (
                <Button
                  key={section.title}
                  variant={currentSection === index ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => {
                    setCurrentSection(index)
                  }}
                >
                  {section.icon}
                  {section.title}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="mt-2" />
          </ScrollArea>
        </nav>
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
