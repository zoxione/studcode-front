import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Badge } from "@/01-shared/ui/Badge"
import { Textarea } from "@/01-shared/ui/Textarea"
import { Title } from "@/01-shared/ui/Title"
import { userAPI } from "@/02-entities/user"

export default async function UserProfile({ params }: { params: { username: string } }) {
  const user = await userAPI.getOne(params.username)

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Title order={6}>Описание</Title>
        <Textarea disabled placeholder={user.about} />
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
    </div>
  )
}
