import { ReactNode } from "react"
import { PersonIcon, TextAlignRightIcon } from "@radix-ui/react-icons"

import { Separator } from "@/01-shared/ui/Separator"
import { Title } from "@/01-shared/ui/Title"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { Sidebar } from "@/04-widgets/sidebar"

export default async function UserSettings({ children }: { children: ReactNode }) {
  return (
    <Layout header={<Header />} footer={<Footer />} className="mb-6">
      <header className="mb-6">
        <div className="space-y-0.5 py-6">
          <Title order={3}>Настройки</Title>
          <p className="text-muted-foreground">Управляйте настройками учетной записи.</p>
        </div>
        <Separator />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16 h-full">
        <aside className="flex flex-col gap-2 lg:sticky lg:top-[90px] lg:h-fit">
          <Sidebar
            items={[
              {
                href: "/settings",
                label: "Профиль",
                icon: <TextAlignRightIcon className="w-4 h-4" />,
              },
              {
                href: "/settings/account",
                label: "Аккаунт",
                icon: <PersonIcon className="w-4 h-4" />,
              },
            ]}
          />
        </aside>
        <section className="col-span-1 lg:col-span-3 h-full">{children}</section>
      </div>
    </Layout>
  )
}
