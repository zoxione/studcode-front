import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { notFound } from "next/navigation"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Badge } from "@/01-shared/ui/Badge"
import { Button } from "@/01-shared/ui/Button"
import { Label } from "@/01-shared/ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/01-shared/ui/Tabs"
import { Textarea } from "@/01-shared/ui/Textarea"
import { Title } from "@/01-shared/ui/Title"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { userAPI } from "@/02-entities/user"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ProjectsList } from "@/04-widgets/projects-list"
import { getSession } from "@/03-features/auth"

export default async function User({ params }: { params: { id: string } }) {
  const user = await userAPI.getOneById(params.id)
  if (!user) {
    notFound()
  }
  const userInitials = getUserInitials(user?.full_name.surname, user?.full_name.name)

  const session = getSession()
  const isOwner = session?.sub === user?._id

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="absolute left-0 h-24 w-full bg-gradient-to-l from-[#FFA585] to-[#FFEDA0]"></div>

      <Avatar className="absolute top-24 left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 h-36 w-36">
        <AvatarImage src={user?.avatar} alt={user?.username} />
        <AvatarFallback className="text-5xl font-semibold">{userInitials}</AvatarFallback>
      </Avatar>

      <div className="mt-24 flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-6">
        <div className="mt-20 w-36 flex flex-row items-center justify-center gap-2">
          <span className="text-green-600 font-semibold">+160</span>
          <span className="font-medium">c 2010 г.</span>
        </div>
        <div className="flex flex-col">
          <Title order={3}>{`${user?.full_name.surname} ${user?.full_name.name} ${user?.full_name.patronymic}`}</Title>
          <span>@{user?.username}</span>
        </div>
        <div className="ml-auto flex flex-row items-center gap-2">
          {/* <Button variant="outline" size="icon">
            <DotsHorizontalIcon className="w-4 h-4" />
          </Button> */}
          <Button asChild>
            <Link href={`/u/${user._id}/settings`}>Изменить</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full max-w-2xl mt-8 mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          {isOwner ? <TabsTrigger value="drafts">Черновики</TabsTrigger> : null}
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <div className="space-y-1">
            <Title order={6}>Описание</Title>
            <Textarea disabled placeholder={user?.about} />
          </div>
          <div className="space-y-1">
            <Title order={6}>Ссылки</Title>
            {user.links.github ? (
              <Badge variant="outline" asChild>
                <Link href={user.links.github} target="_blank">
                  <GitHubLogoIcon className="mr-1 h-4 w-4" />
                  Github
                </Link>
              </Badge>
            ) : null}
            {user.links.telegram ? (
              <Badge variant="outline" asChild>
                <Link href={user.links.telegram} target="_blank">
                  <GitHubLogoIcon className="mr-1 h-4 w-4" />
                  Telegram
                </Link>
              </Badge>
            ) : null}
            {user.links.vkontakte ? (
              <Badge variant="outline" asChild>
                <Link href={user.links.vkontakte} target="_blank">
                  <GitHubLogoIcon className="mr-1 h-4 w-4" />
                  Vk
                </Link>
              </Badge>
            ) : null}
          </div>
          {/* <div className="space-y-1">
            <Title order={6}>Награды</Title>
            <Badge variant="outline">Топ 1</Badge>
          </div> */}
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsList filter={{ creator_id: user?._id, status: "published" }} />
        </TabsContent>
        <TabsContent value="drafts">
          <ProjectsList filter={{ creator_id: user?._id, status: "draft" }} projectCardProps={{ isEdit: true }} />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
