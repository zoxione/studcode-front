import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import { PlusCircledIcon, TextAlignRightIcon } from "@radix-ui/react-icons"
import { Users2Icon } from "lucide-react"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Separator } from "@/01-shared/ui/Separator"
import { Title } from "@/01-shared/ui/Title"
import { teamAPI } from "@/02-entities/team"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { Sidebar } from "@/04-widgets/sidebar"

interface PageProps {
  params: { slug: string }
  children: ReactNode
}

export default async function TeamsEdit({ params, children }: PageProps) {
  let team
  try {
    team = await teamAPI.getOne(params.slug)
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
    <Layout header={<Header />} footer={<Footer />} className="mb-6">
      <header className="mb-6">
        <div className="space-y-0.5 py-6">
          <Title order={3}>Редактирование команды</Title>
          <p className="text-muted-foreground">Управляйте настройками команды.</p>
        </div>
        <Separator />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16 h-full">
        <aside className="flex flex-col gap-2 lg:sticky lg:top-[90px] lg:h-fit">
          <Sidebar
            items={[
              {
                href: `/teams/${team.slug}/edit`,
                label: "Основная информация",
                icon: <TextAlignRightIcon className="w-4 h-4" />,
              },
              {
                href: `/teams/${team.slug}/edit/members`,
                label: "Участники",
                icon: <Users2Icon className="w-4 h-4" />,
              },
              {
                href: `/teams/${team.slug}/edit/additional`,
                label: "Дополнительно",
                icon: <PlusCircledIcon className="w-4 h-4" />,
              },
            ]}
          />
        </aside>
        <section className="col-span-1 lg:col-span-3 h-full">{children}</section>
      </div>
    </Layout>
  )
}
