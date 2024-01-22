"use client"

import { Button } from "@/01-shared/ui/Button"
import { Checkbox } from "@/01-shared/ui/Checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { MultiSelect } from "@/01-shared/ui/MultiSelect"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/RadioGroup"
import { Textarea } from "@/01-shared/ui/Textarea"
import { Title } from "@/01-shared/ui/Title"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
  tags: z.array(
    z
      .string()
      .min(2, { message: "Минимальная длина тега - 2 символа" })
      .max(50, { message: "Максимальная длина тега - 50 символов" }),
  ),
  avatar: z.string().url({ message: "Некорректный URL аватара" }),
  screenshots: z.array(z.string().url({ message: "Некорректный URL скриншота" })),
  demo_link: z.string().url({ message: "Некорректный URL для демонстрации" }),
  price: z.enum(["free", "free_options", "payment_required"]),
})

export default function NewProject() {
  const [currentSection, setCurrentSection] = useState(0)

  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      title: "",
      tagline: "",
      source_link: "",
      github_link: "",
      description: "",
      tags: [],
      avatar: "",
      screenshots: [],
      demo_link: "",
      price: "free",
    },
  })

  function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    console.log(values)
  }

  const sections = [
    {
      title: "Основная информация",
      content: (
        <>
          <div className="space-y-4">
            <Title order={5}>Расскажите об проекте</Title>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Мега крутой проект" {...field} />
                  </FormControl>
                  <FormDescription>Это публичное название вашего проекта</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Слоган</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Сервис по созданию чат-бота с искусственным интеллектом для поддержки клиентов."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Лаконичный и описательный слоган для проекта</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <Title order={5}>Ссылки</Title>
            <FormField
              control={form.control}
              name="source_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на проект</FormLabel>
                  <FormControl>
                    <Input placeholder="https://sample.com" {...field} />
                  </FormControl>
                  <FormDescription>Ссылка на публикацию проекта</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на исходный код</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com" {...field} />
                  </FormControl>
                  <FormDescription>Ссылка на исходный код</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <Title order={5}>Описание</Title>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Это краткое описание" {...field} />
                  </FormControl>
                  <FormDescription>Краткое описание проекта</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <Title order={5}>Теги</Title>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Теги</FormLabel> */}
                  <FormControl>
                    <MultiSelect
                      items={[
                        { value: "react", label: "React" },
                        { value: "svelte", label: "Svelte" },
                      ]}
                    />
                  </FormControl>
                  <FormDescription>Выберите до трех тем</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      ),
    },
    {
      title: "Изображения и медиа",
      content: (
        <>
          <div className="space-y-4">
            <Title order={5}>Миниатюра</Title>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Это краткое описание" {...field} />
                  </FormControl>
                  <FormDescription>Краткое описание проекта</FormDescription>
                  <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <Title order={5}>Скриншоты</Title>
            <FormField
              control={form.control}
              name="screenshots"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Это краткое описание" {...field} />
                  </FormControl>
                  <FormDescription>Краткое описание проекта</FormDescription>
                  <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <Title order={5}>YouTube видео</Title>
            <FormField
              control={form.control}
              name="demo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ссылка на видео </FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/" {...field} />
                  </FormControl>
                  <FormDescription>Ссылка на видео</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      ),
    },
    {
      title: "Дополнительно",
      content: (
        <>
          <div className="space-y-4">
            <Title order={5}>Цены</Title>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Выберите ценообразование</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="free" />
                        </FormControl>
                        <FormLabel className="font-normal">Бесплатно</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="free_options" />
                        </FormControl>
                        <FormLabel className="font-normal">Есть бесплатные опции</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="payment_required" />
                        </FormControl>
                        <FormLabel className="font-normal">Платно</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <Checkbox checked={form.getValues().title !== ""} />
                Название
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().tagline !== ""} />
                Слоган
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().description !== ""} />
                Описание
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().tags.length > 0} />
                Теги (хотя бы 1)
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().avatar !== ""} />
                Логотип
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().screenshots.length > 0} />
                Скриншоты (хотя бы 1)
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <Title order={5}>Дополнительная информация</Title>
            <div className="grid grid-rows-4 grid-flow-col justify-start gap-y-4 gap-x-24">
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().source_link !== ""} />
                Другие ссылки
              </label>
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().github_link !== ""} />
                Цены
              </label>
              {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().promo_code !== ""} />
                Промо-код
              </label> */}
              <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().demo_link !== ""} />
                YouTube видео
              </label>
              {/* <label className="flex items-center gap-2 text-sm font-medium leading-none">
                <Checkbox checked={form.getValues().team.length > 0} />
                Команда
              </label> */}
            </div>
          </div>

          <Button type="submit">Отправить</Button>
        </>
      ),
    },
  ]

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="my-8">
        <Title order={4}>Новый проект</Title>
        <span>Статус: черновик</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 h-full">
        <aside className="hidden lg:flex flex-col gap-2 sticky top-[80px] h-[calc(100vh-80px-116px)]">
          {sections.map((section, index) => (
            <Button
              key={section.title}
              variant={currentSection === index ? "default" : "ghost"}
              size="lg"
              className="justify-start px-4"
              onClick={() => setCurrentSection(index)}
            >
              {section.title}
            </Button>
          ))}
        </aside>
        <section className="col-span-3 lg:col-span-3 h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {sections[currentSection].content}
            </form>
          </Form>
        </section>
      </div>
    </Layout>
  )
}
