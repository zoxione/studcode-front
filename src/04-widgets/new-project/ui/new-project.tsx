"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/01-shared/ui/Button"
import { Checkbox } from "@/01-shared/ui/Checkbox"
import { Form } from "@/01-shared/ui/Form"
import { Title } from "@/01-shared/ui/Title"
import { projectAPI, useCreateOneProjectMutation } from "@/02-entities/project"
import { useWhoamiQuery, userAPI } from "@/02-entities/user"

import { Extras } from "./extras"
import { ImagesAndMedia } from "./images-and-media"
import { MainInfo } from "./main-info"

const newProjectFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Минимальная длина заголовка - 2 символа" })
    .max(50, { message: "Максимальная длина заголовка - 50 символов" }),
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
  // tags: z.array(
  //   z
  //     .string()
  //     .min(2, { message: "Минимальная длина тега - 2 символа" })
  //     .max(50, { message: "Максимальная длина тега - 50 символов" }),
  // ),
  // logo: z.string().url({ message: "Некорректный URL аватара" }),
  // screenshots: z.array(z.string().url({ message: "Некорректный URL скриншота" })),
  demo_link: z.string().url({ message: "Некорректный URL для демонстрации" }),
  price: z.enum(["free", "free_options", "payment_required"]),
})

const NewProject = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const { data: user } = useWhoamiQuery()
  const { mutate: createOneProject } = useCreateOneProjectMutation()

  const newProjectForm = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      title: "",
      tagline: "",
      source_link: "",
      github_link: "",
      description: "",
      // tags: [],
      // logo: "",
      // screenshots: [],
      demo_link: "",
      price: "free",
    },
  })

  useEffect(() => {
    if (newProjectForm.formState.isSubmitted && !newProjectForm.formState.isValid) {
      toast.error("Введены некорректные данные")
    }
  }, [newProjectForm.formState.submitCount])

  const onSubmit = async (values: z.infer<typeof newProjectFormSchema>) => {
    console.log("values", values)

    if (user) {
      createOneProject({
        title: values.title,
        tagline: values.tagline,
        status: "draft",
        description: values.description,
        flames: 0,
        links: {
          main: values.source_link,
          demo: values.demo_link,
          github: values.github_link || "",
        },
        logo: "https://vk.com/im",
        screenshots: [],
        price: values.price,
        tags: [],
        creator: user.sub,
      })
    } else {
      toast.error("Вы не авторизованы")
    }
  }

  const sections = [
    {
      title: "Основная информация",
      content: (
        <>
          <MainInfo form={newProjectForm} />
        </>
      ),
    },
    {
      title: "Изображения и медиа",
      content: (
        <>
          <ImagesAndMedia form={newProjectForm} />
        </>
      ),
    },
    {
      title: "Дополнительно",
      content: (
        <>
          <Extras form={newProjectForm} />
        </>
      ),
    },
    {
      title: "Публикация",
      content: (
        <>
          <div className="space-y-4">
            <Title order={5}>Необходимая информация</Title>
            <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().title !== ""} />
                Название
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().tagline !== ""} />
                Слоган
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().description !== ""} />
                Описание
              </label>
              {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().tags.length > 0} />
                Теги (хотя бы 1)
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().logo !== ""} />
                Логотип
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().screenshots.length > 0} />
                Скриншоты (хотя бы 1)
              </label> */}
            </div>
          </div>

          <div className="space-y-4">
            <Title order={5}>Дополнительная информация</Title>
            <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().source_link !== ""} />
                Другие ссылки
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().github_link !== ""} />
                Цены
              </label>
              {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().promo_code !== ""} />
                Промо-код
              </label> */}
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().demo_link !== ""} />
                YouTube видео
              </label>
              {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={newProjectForm.getValues().team.length > 0} />
                Команда
              </label> */}
            </div>
          </div>

          <Button type="submit">Отправить</Button>
        </>
      ),
    },
  ]

  console.log("currentSection", currentSection)
  console.log(newProjectForm.getValues())

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 h-full">
      <aside className="hidden lg:flex flex-col gap-2 sticky top-[80px] h-[calc(100vh-80px-116px)]">
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
      <section className="col-span-3 lg:col-span-3 h-full">
        <Form {...newProjectForm}>
          <form onSubmit={newProjectForm.handleSubmit(onSubmit)} className="space-y-8">
            {sections[currentSection].content}
          </form>
        </Form>
      </section>
    </div>
  )
}

export { NewProject }
