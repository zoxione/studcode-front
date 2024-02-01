import { GitHubLogoIcon, LinkBreak2Icon } from "@radix-ui/react-icons"
import { notFound } from "next/navigation"

import { Button } from "@/01-shared/ui/Button"
import { Input } from "@/01-shared/ui/Input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/01-shared/ui/Tabs"
import { Title } from "@/01-shared/ui/Title"
import { User, userAPI } from "@/02-entities/user"
import { MyDetails } from "@/03-features/my-details"
import { NotificationSettings } from "@/03-features/notification-settings"
import { PrivacySettings } from "@/03-features/privacy-settings"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"

export default async function User({ params }: { params: { id: string } }) {
  const user = await userAPI.getOneById(params.id)
  if (!user) {
    notFound()
  }

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <Tabs defaultValue="settings" className="max-w-xl mb-12">
        <TabsList className=" mt-8 mb-8">
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="details">Мои данные</TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="mt-6 space-y-12">
          <div className="space-y-6">
            <Title order={3}>Подключенные аккаунты</Title>
            <div className="space-y-4">
              <span>Вы связаны с:</span>
              <div className="flex flex-row items-center gap-4">
                <Button variant="ghost" size="icon" className="flex-none">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
                <Input value={user?.links.github || ""} disabled />
                <Button variant="destructive" size="icon" className="flex-none">
                  <LinkBreak2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <span className="">Можно подключить:</span>
              <div className="flex flex-row items-center gap-4">
                <Button variant="ghost" size="icon">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Title order={3}>Настройки уведомлений</Title>
            <NotificationSettings user={user as User} />
          </div>
          <div className="space-y-6">
            <Title order={3}>Конфиденциальность</Title>
            <PrivacySettings user={user as User} />
          </div>
        </TabsContent>
        <TabsContent value="details">
          <Title order={3}>Мои данные</Title>
          <MyDetails user={user as User} />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
