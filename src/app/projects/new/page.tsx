import { Title } from "@/01-shared/ui/Title"
import { NewProjectForm } from "@/03-features/new-project"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"

export default function NewProjectPage() {
  return (
    <Layout header={<Header />} footer={<Footer />} className="flex flex-col justify-center items-center gap-8">
      <Title order={4}>Новый проект</Title>
      <NewProjectForm />
    </Layout>
  )
}
