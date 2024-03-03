import Link from "next/link"

import { buttonVariants } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"

export default async function TeamsPage() {
  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8">
      {/* <HeaderPage className="my-8" title="Мои команды" /> */}
      <div className="flex justify-between">
        <Title order={6} className="mb-2">
          Мои команды
        </Title>
        <Link href="/teams/new" className={cn(buttonVariants({ variant: "outline" }))}>
          Создать команду
        </Link>
      </div>
    </Layout>
  )
}
