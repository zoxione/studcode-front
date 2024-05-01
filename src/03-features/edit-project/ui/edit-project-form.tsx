"use client"

import * as z from "zod"
import { CheckCircledIcon, ImageIcon, PlusCircledIcon, TextAlignRightIcon } from "@radix-ui/react-icons"
import dynamic from "next/dynamic"

import { Button } from "@/01-shared/ui/button"
import { Form } from "@/01-shared/ui/form"
import { Project } from "@/02-entities/project"
import { useEditProject } from "../lib/use-edit-project"
import { editProjectSchema } from "../lib/edit-project-schema"
import { ScrollArea, ScrollBar } from "@/01-shared/ui/scroll-area"
import { MainInfoSectionLoading } from "./main-info-section"
import { ImagesAndMediaSectionLoading } from "./images-and-media-section"
import { ExtrasSectionLoading } from "./extras-section"
import { PublishSectionLoading } from "./publish-section"

const MainInfoSection = dynamic(() => import("./main-info-section").then((mod) => mod.MainInfoSection), {
  ssr: false,
  loading: () => <MainInfoSectionLoading />,
})
const ImagesAndMediaSection = dynamic(
  () => import("./images-and-media-section").then((mod) => mod.ImagesAndMediaSection),
  { ssr: false, loading: () => <ImagesAndMediaSectionLoading /> },
)
const ExtrasSection = dynamic(() => import("./extras-section").then((mod) => mod.ExtrasSection), {
  ssr: false,
  loading: () => <ExtrasSectionLoading />,
})
const PublishSection = dynamic(() => import("./publish-section").then((mod) => mod.PublishSection), {
  ssr: false,
  loading: () => <PublishSectionLoading />,
})

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
      content: <ExtrasSection form={editProjectForm} project={project} />,
    },
    {
      title: "Публикация",
      icon: <CheckCircledIcon className="w-4 h-4" />,
      content: (
        <PublishSection
          form={editProjectForm}
          project={project}
          onSaveDraft={() => handleSaveDraft(editProjectForm.getValues())}
          isLoading={isLoading}
          setCurrentSection={setCurrentSection}
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
              handlePublish(values),
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
