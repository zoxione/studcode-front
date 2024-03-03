import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Separator } from "@/01-shared/ui/Separator"
import { Title } from "@/01-shared/ui/Title"
import { teamAPI } from "@/02-entities/team"
import { Sidebar } from "@/03-features/sidebar"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"

interface PageProps {
  params: { name: string }
  children: ReactNode
}

export default async function TeamsEdit({ params, children }: PageProps) {
  let team
  try {
    team = await teamAPI.getOne(params.name)
  } catch {
    notFound()
  }
  const session = await getServerSession(authOptions)
  const isOwner = team.members.some(
    (member) => member.user.username === session?.user.username && member.role === "owner",
  )
  if (!isOwner) {
    redirect("/denied")
  }

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="my-8">
        <div className="space-y-0.5">
          <Title order={3}>Настройки</Title>
          <p className="text-muted-foreground">Управляйте настройками команды.</p>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16 h-full">
          <aside className="flex flex-col gap-2 lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px-116px)]">
            <Sidebar
              items={[
                {
                  href: `/teams/${team.name}/edit`,
                  label: "Информация о команде",
                },
                {
                  href: `/teams/${team.name}/edit/members`,
                  label: "Участники",
                },
              ]}
            />
          </aside>
          <section className="col-span-1 lg:col-span-3 h-full">{children}</section>
        </div>
      </div>
    </Layout>
  )
}
