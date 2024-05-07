import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Badge } from "@/01-shared/ui/badge"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Title } from "@/01-shared/ui/title"
import { EducationCard } from "@/02-entities/education"
import { SpecializationCard } from "@/02-entities/specialization"
import { userAPI } from "@/02-entities/user"
import { LinksList } from "@/04-widgets/links-list"

interface PageProps {
  params: { username: string }
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(params.username)
  const isOwner = session?.user.username === user?.username

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Title order={6} className="flex items-center gap-2">
          О себе
        </Title>
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
        <Title order={6} className="flex items-center gap-2">
          Образование
        </Title>
        <Card>
          <CardContent className="p-6">
            {user.education !== null ? (
              <EducationCard education={user.education} />
            ) : (
              <span className="text-sm text-muted-foreground">Образование не добавлено.</span>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
        <Title order={6} className="flex items-center gap-2">
          Специализации
          <Badge>{user.specializations.length}</Badge>
        </Title>
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-2">
            {user.specializations.length > 0 ? (
              user.specializations.map((spec) => <SpecializationCard key={spec._id} specialization={spec} />)
            ) : (
              <span className="text-sm text-muted-foreground">Специализации не добавлены.</span>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
        <Title order={6} className="flex items-center gap-2">
          Ссылки
          <Badge>{user.links.length}</Badge>
        </Title>
        <Card>
          <CardContent className="p-6">
            {user.links.length > 0 ? (
              <LinksList links={user.links} />
            ) : (
              <span className="text-sm text-muted-foreground">Ссылки не добавлены.</span>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
