"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { ExtrasSection } from "./extras-section"
import { ImagesAndMediaSection } from "./images-and-media-section"
import { MainInfoSection } from "./main-info-section"
import { PublishSection } from "./publish-section"

import { Button } from "@/01-shared/ui/Button"
import { Form } from "@/01-shared/ui/Form"
import { Project, useUpdateOneByIdProjectMutation } from "@/02-entities/project"
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../data/constants"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

export const editProjectFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Минимальная длина заголовка - 2 символа" })
    .max(20, { message: "Максимальная длина заголовка - 20 символов" }),
  tagline: z
    .string()
    .min(2, { message: "Минимальная длина тега - 2 символа" })
    .max(50, { message: "Максимальная длина тега - 50 символов" }),
  source_link: z.string().url({ message: "Некорректный URL для исходного кода" }),
  github_link: z.string().url({ message: "Некорректный URL для исходного кода" }).optional(),
  description: z
    .string()
    .min(2, { message: "Минимальная длина описания - 2 символа" })
    .max(255, { message: "Максимальная длина описания - 255 символов" }),
  tags: z.array(optionSchema).min(1, { message: "Выберите хотя бы 1 тег" }).max(3, {
    message: "Выберите максимум 3 тега",
  }),
  // logo: z.string().url({ message: "Некорректный URL логотипа" }),
  logo: z
    .any()
    .refine((files) => files?.length == 1, "Логотип необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер логотипа - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    ),
  screenshots: z
    .any()
    .refine((files) => files?.length >= 1, "Скриншоты необходимы.")
    .refine((files) => files?.length <= 10, "Максимальное количество скриншотов - 10.")
    .refine(
      (files) => Array.from(files).every((file: any) => file?.size <= MAX_FILE_SIZE),
      `Максимальный размер скриншота - 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    ),
  // screenshots: z.array(z.string().url({ message: "Некорректный URL скриншота" })),
  demo_link: z.string().url({ message: "Некорректный URL для демонстрации" }).optional(),
  price: z.enum(["free", "free_options", "payment_required"]),
})

interface EditProjectFormProps {
  project: Project
}

const EditProjectForm = ({ project }: EditProjectFormProps) => {
  const [currentSection, setCurrentSection] = useState(0)
  const { data: session } = useSession()
  const { mutate: updateProject } = useUpdateOneByIdProjectMutation()

  const editProjectForm = useForm<z.infer<typeof editProjectFormSchema>>({
    resolver: zodResolver(editProjectFormSchema),
    defaultValues: {
      title: project.title,
      tagline: project.tagline,
      source_link: project.links.main,
      github_link: project.links.github || "",
      description: project.description,
      tags: project.tags.map((tag) => ({ label: tag.name.ru, value: tag._id })),
      logo: "https://raw.githubusercontent.com/AmyGrooove/bisky-front/dev/public/favicons/favicon-128x128.png",
      screenshots: [],
      demo_link: project.links.demo || "",
      price: project.price,
    },
  })

  useEffect(() => {
    if (editProjectForm.formState.isSubmitted && Object.keys(editProjectForm.formState.errors).length > 0) {
      toast.error("Введены некорректные данные")
    }
  }, [editProjectForm.formState.submitCount, editProjectForm.formState.errors])

  const handlePublish = async (values: z.infer<typeof editProjectFormSchema>) => {
    if (!session) {
      toast.error("Вы не авторизованы")
      return
    }
    updateProject({
      id: project._id,
      project: {
        title: values.title,
        tagline: values.tagline,
        status: "published",
        description: values.description || "",
        links: {
          main: values.source_link,
          demo: values.demo_link,
          github: values.github_link || "",
        },
        logo: "https://raw.githubusercontent.com/AmyGrooove/bisky-front/dev/public/favicons/favicon-128x128.png",
        screenshots: [],
        price: values.price,
        tags: values.tags.map((tag) => tag.value),
      },
    })
  }

  const handleSaveDraft = () => {
    const values = editProjectForm.getValues()
    if (!session) {
      toast.error("Вы не авторизованы")
      return
    }
    updateProject({
      id: project._id,
      project: {
        title: values.title,
        tagline: values.tagline,
        status: "draft",
        description: values.description || "",
        links: {
          main: values.source_link,
          demo: values.demo_link,
          github: values.github_link || "",
        },
        logo: "",
        screenshots: [],
        price: values.price,
        tags: values.tags.map((tag) => tag.value),
      },
    })
  }

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
      content: <PublishSection form={editProjectForm} onSaveDraft={handleSaveDraft} />,
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
          <form onSubmit={editProjectForm.handleSubmit(handlePublish)} className="space-y-8 mb-8">
            {sections[currentSection].content}
          </form>
        </Form>
      </section>
    </div>
  )
}

export { EditProjectForm }
