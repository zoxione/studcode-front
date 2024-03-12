import Link from "next/link"

import { Title } from "@/01-shared/ui/title"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { CreateProjectForm } from "@/03-features/create-project"

export default function NewProjectPage() {
  return (
    <Layout header={<Header />} footer={<Footer />} className="flex flex-col justify-center items-center gap-8 py-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Title order={3}>Новый проект</Title>
          <p className="text-sm text-muted-foreground">Введите название проекта, чтобы создать его</p>
        </div>
        <CreateProjectForm />
        <p className="text-center text-sm text-muted-foreground">
          Нажимая кнопку &quot;Создать&quot;, вы соглашаетесь с нашими{" "}
          <Link href="/terms" target="_blank" className="underline underline-offset-4 hover:text-primary">
            Пользовательским соглашением
          </Link>{" "}
          и{" "}
          <Link href="/privacy" target="_blank" className="underline underline-offset-4 hover:text-primary">
            Политикой конфиденциальности
          </Link>
          .
        </p>
      </div>
    </Layout>
  )
}
