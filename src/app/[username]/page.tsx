import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Badge, badgeVariants } from "@/01-shared/ui/Badge"
import { Card, CardContent } from "@/01-shared/ui/Card"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"
import { TeamBadge, teamAPI } from "@/02-entities/team"
import { userAPI } from "@/02-entities/user"

export default async function UserProfile({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(params.username)
  const { results: teams } = await teamAPI.getAll({ member_id: user._id })
  const isOwner = session?.user.username === user?.username

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Title order={6}>Описание</Title>
        <Card>
          <CardContent className="p-6">
            <p>{user.about}</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
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
      {/* <div className="space-y-2">
            <Title order={6}>Награды</Title>
            <Badge variant="outline">Топ 1</Badge>
          </div> */}
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
          {teams.map((team) => (
            <TeamBadge key={team._id} team={team} />
          ))}
        </div>
      </div>
    </div>
  )
}
