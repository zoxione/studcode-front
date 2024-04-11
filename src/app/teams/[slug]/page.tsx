import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { Metadata } from "next"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Title } from "@/01-shared/ui/title"
import { TeamMemberCard, teamAPI } from "@/02-entities/team"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { cn } from "@/01-shared/utils/cn"
import { buttonVariants } from "@/01-shared/ui/button"
import { JoinTeamButton } from "@/03-features/join-team"
import { LeaveTeamButton } from "@/03-features/leave-team"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let team
  try {
    team = await teamAPI.getOne(params.slug)
  } catch {
    notFound()
  }
  return {
    title: team.name ?? "",
    description: team.about ?? "",
    openGraph: {
      title: `${team.name ?? ""} | Студенческий Код`,
      description: team.about ?? "",
      url: `${process.env.APP_URL}/teams/${team.slug}`,
      images: [team.logo !== "" ? team.logo : `${process.env.APP_URL}/icon.png`],
    },
  }
}

export const revalidate = 60

export default async function Page({ params }: PageProps) {
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
  const isMember = team.members.some(
    (member) => member.user.username === session?.user.username && member.role === "member",
  )

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8 py-8">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Avatar className="w-36 h-36 text-3xl">
          <AvatarImage src={team.logo} width={144} height={144} alt={team.name} />
          <AvatarFallback>{team.name[0]}</AvatarFallback>
        </Avatar>
        <Title order={2}>{team.name}</Title>
        <div className="flex gap-2">
          {isOwner ? (
            <Link href={`/teams/${team.slug}/edit`} className={cn(buttonVariants({ variant: "outline" }))}>
              Редактировать
            </Link>
          ) : null}
          {!isOwner && !isMember ? (
            <JoinTeamButton teamName={team.name} userId={session?.user._id || ""} disabled={team.status === "closed"} />
          ) : (
            <LeaveTeamButton teamName={team.name} userId={session?.user._id || ""} disabled={isOwner} />
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Title order={5}>О команде</Title>
        <Card>
          <CardContent className="p-6">
            {team.about !== "" ? (
              <p className="whitespace-pre-line">{team.about}</p>
            ) : (
              <p className="text-sm text-muted-foreground flex justify-center items-center text-center">
                {"(≥o≤)"} <br />
                Похоже тут ничего нет.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
        <Title order={5}>Участники</Title>
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-2">
            {team.members.map((member) => (
              <TeamMemberCard key={member.user._id} member={member} />
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
