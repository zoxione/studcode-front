import { Title } from "@/01-shared/ui/Title"
import { projectAPI } from "@/02-entities/project"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ProjectsList } from "@/04-widgets/projects-list"

export default async function Teams() {
  return <Layout header={<Header />} footer={<Footer />} className=""></Layout>
}
