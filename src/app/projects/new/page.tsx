import { Title } from "@/01-shared/ui/Title"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { NewProject } from "@/04-widgets/new-project"

export default function NewProjectPage() {
  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="my-8">
        <Title order={4}>Новый проект</Title>
        <span>Статус: черновик</span>
      </div>

      <NewProject />
    </Layout>
  )
}
