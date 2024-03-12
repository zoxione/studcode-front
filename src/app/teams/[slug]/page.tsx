import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import Link from "next/link"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Title } from "@/01-shared/ui/title"
import { JoinButton, teamAPI } from "@/02-entities/team"
import { TeamMemberCard } from "@/02-entities/team/ui/team-member-card"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { cn } from "@/01-shared/utils/cn"
import { buttonVariants } from "@/01-shared/ui/button"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TeamsPage({ params }: PageProps) {
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
        {isOwner ? (
          <Link href={`/teams/${team.slug}/edit`} className={cn(buttonVariants({ variant: "default" }))}>
            Редактировать
          </Link>
        ) : null}
        {!isOwner && !isMember ? (
          <JoinButton teamName={team.name} userId={session?.user._id || ""} disabled={team.status === "closed"} />
        ) : null}
      </div>
      <div className="space-y-2">
        <Title order={5}>О команде</Title>
        <Card>
          <CardContent className="p-6">
            <p>{team.about}</p>
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