import { Title } from "@/01-shared/ui/Title"
import { CreateTeamForm } from "@/03-features/create-team"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"

export default function NewTeamPage() {
  return (
    <Layout header={<Header />} footer={<Footer />} className="flex flex-col justify-center items-center gap-8 py-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Title order={3}>Создание новой команды</Title>
        </div>
        <CreateTeamForm />
      </div>
    </Layout>
  )
}
