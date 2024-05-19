import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Button } from "@/01-shared/ui/button"
import { Title } from "@/01-shared/ui/title"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { prettyCreatedAt, userAPI } from "@/02-entities/user"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { UserTabs } from "@/04-widgets/user-tabs"

interface LayoutPageProps {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
  children: ReactNode
}

export async function generateMetadata({ params }: LayoutPageProps): Promise<Metadata> {
  let user
  try {
    user = await userAPI.getOne(params.username)
  } catch {
    notFound()
  }
  return {
    title: user.username ?? "",
    description: user.about ?? "",
    openGraph: {
      title: `${user.username ?? ""} | Студенческий Код`,
      description: user.about ?? "",
      url: `${process.env.APP_URL}/${user.username}`,
      images: [user.avatar !== "" ? user.avatar : `${process.env.APP_URL}/icon.png`],
    },
  }
}

export const revalidate = 60

export default async function LayoutPage({ params, children }: LayoutPageProps) {
  let user
  try {
    user = await userAPI.getOne(params.username)
  } catch {
    notFound()
  }

  const userInitials = getUserInitials(user?.full_name.surname, user?.full_name.name)
  const session = await getServerSession(authOptions)
  const isOwner = session?.user.username === user?.username

  return (
    <Layout header={<Header />} footer={<Footer />} className="mx-auto max-w-4xl">
      <div className="absolute left-0 h-36 w-full rounded-xl overflow-hidden">
        {user.cover !== "" ? (
          <Image src={user.cover} alt={`${user.username}-cover`} fill className="object-cover" />
        ) : (
          <div className="size-full bg-gradient-to-l from-[#FFA585] to-[#FFEDA0]"></div>
        )}
      </div>

      <Avatar className="absolute top-36 left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 h-36 w-36 border-8 border-background">
        <AvatarImage src={user?.avatar} asChild>
          <Image src={user?.avatar} alt={user?.username} fill />
        </AvatarImage>
        <AvatarFallback className="text-5xl font-semibold">{userInitials}</AvatarFallback>
      </Avatar>

      <div className="mt-[152px] flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-6">
        <div className="mt-[72px] w-36 flex flex-row items-center justify-center gap-2 text-sm">
          <span className="font-medium">с {prettyCreatedAt(user.created_at)} г.</span>
        </div>
        <div className="flex flex-col">
          <Title
            order={3}
            className="text-center md:text-left"
          >{`${user?.full_name.surname} ${user?.full_name.name} ${user?.full_name.patronymic}`}</Title>
          <span className="text-muted-foreground text-center md:text-start leading-none">@{user?.username}</span>
        </div>
        <div className="md:ml-auto flex flex-row items-center gap-2">
          {/* <Button variant="outline" size="icon">
            <DotsHorizontalIcon className="w-4 h-4" />
          </Button> */}
          {isOwner ? (
            <Button asChild>
              <Link href={`/settings`}>Изменить</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="my-8 w-full space-y-6">
        <UserTabs user={user} isOwner={isOwner} />
        {children}
      </div>
    </Layout>
  )
}
