import { buttonVariants } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"
import { NewProjectForm } from "@/03-features/new-project"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import Link from "next/link"

export default function NewProjectPage() {
  return (
    <Layout header={<Header />} footer={<Footer />} className="flex flex-col justify-center items-center gap-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Title order={3}>Новый проект</Title>
          <p className="text-sm text-muted-foreground">Введите название проекта, чтобы создать его</p>
        </div>
        <NewProjectForm />
        <p className="text-center text-sm text-muted-foreground">
          Нажимая кнопку &quot;Создать&quot;, вы соглашаетесь с нашими{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Условиями использования
          </Link>{" "}
          и{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Политикой конфиденциальности
          </Link>
          .
        </p>
      </div>
    </Layout>
  )
}
