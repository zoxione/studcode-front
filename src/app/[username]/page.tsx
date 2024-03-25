import { getServerSession } from "next-auth"
import Link from "next/link"

import { authOptions } from "@/01-shared/lib/auth-options"
import { badgeVariants } from "@/01-shared/ui/badge"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"
import { TeamBadge, teamAPI } from "@/02-entities/team"
import { userAPI } from "@/02-entities/user"
import { LinksList } from "@/04-widgets/links-list"

interface PageProps {
  params: { username: string }
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(params.username)
  const { results: teams } = await teamAPI.getAll({ member_id: user._id })
  const isOwner = session?.user.username === user?.username

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Title order={6}>О себе</Title>
        <Card>
          <CardContent className="p-6">
            {user.about !== "" ? (
              <p className="whitespace-pre-line">{user.about}</p>
            ) : (
              <p className="text-sm text-muted-foreground flex justify-center items-center text-center">
                {"(__ ͡° ͜ʖ ͡°)_"} <br />
                Похоже тут ничего нет.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
        <Title order={6}>Ссылки</Title>
        {user.links.length > 0 ? (
          <LinksList links={user.links} />
        ) : (
          <span className="text-sm text-muted-foreground">Ссылки не добавлены.</span>
        )}
      </div>
      <div className="space-y-2">
        <Title order={6}>
          Команды
          {isOwner ? (
            <Link href="/teams/new" className={cn(badgeVariants({ variant: "secondary" }), "ml-2")}>
              Создать
            </Link>
          ) : null}
        </Title>
        <div className="flex flex-wrap gap-2">
          {teams.length > 0 ? (
            teams.map((team) => <TeamBadge key={team._id} team={team} />)
          ) : (
            <span className="text-sm text-muted-foreground">Команд нет.</span>
          )}
        </div>
      </div>
    </div>
  )
}
