import { ReactNode } from "react"

import { UserSettingsSidebar } from "@/03-features/user-settings-sidebar"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { Separator } from "@/01-shared/ui/Separator"
import { Title } from "@/01-shared/ui/Title"

export default async function UserSettings({ children }: { children: ReactNode }) {
  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="my-8">
        <div className="space-y-0.5">
          <Title order={3}>Настройки</Title>
          <p className="text-muted-foreground">Управляйте настройками учетной записи.</p>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16 h-full">
          <aside className="flex flex-col gap-2 lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px-116px)]">
            <UserSettingsSidebar />
          </aside>
          <section className="col-span-1 lg:col-span-3 h-full">{children}</section>
        </div>
      </div>
    </Layout>
  )
}
