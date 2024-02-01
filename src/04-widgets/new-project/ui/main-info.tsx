import { UseFormReturn } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Textarea } from "@/01-shared/ui/Textarea"
import { Title } from "@/01-shared/ui/Title"

interface MainInfoProps {
  form: UseFormReturn<
    {
      title: string
      tagline: string
      source_link: string
      description: string
      demo_link: string
      price: "free" | "free_options" | "payment_required"
      github_link?: string | undefined
    },
    any,
    undefined
  >
}

const MainInfo = ({ form }: MainInfoProps) => {
  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Расскажите об проекте</Title>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Название</FormLabel>
              <FormControl>
                <Input type="text" id="title" placeholder="Мега крутой проект" {...field} />
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
              <FormLabel htmlFor="tagline">Слоган</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="tagline"
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
              <FormLabel htmlFor="source_link">Ссылка на проект</FormLabel>
              <FormControl>
                <Input type="url" id="source_link" placeholder="https://sample.com" {...field} />
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
              <FormLabel htmlFor="github_link">Ссылка на исходный код</FormLabel>
              <FormControl>
                <Input type="url" id="github_link" placeholder="https://github.com" {...field} />
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
              <FormLabel htmlFor="description">Описание</FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="Это краткое описание" {...field} />
              </FormControl>
              <FormDescription>Краткое описание проекта</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <Title order={5}>Теги</Title>
        {/* <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem> */}
        {/* <FormLabel>Теги</FormLabel> */}
        {/* <FormControl>
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
            /> */}
      </div>
    </>
  )
}

export { MainInfo }
