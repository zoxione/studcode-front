import { Separator } from "@/01-shared/ui/separator"
import { teamAPI } from "@/02-entities/team"
import { EditTeam } from "@/03-features/edit-team"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TeamsEditPage({ params }: PageProps) {
  let team = await teamAPI.getOne(params.slug)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Информация о команде</h3>
        <p className="text-sm text-muted-foreground">Именно так другие увидят ее на сайте.</p>
      </div>
      <Separator />
      <EditTeam teamId={team._id} />
    </div>
  )
}
