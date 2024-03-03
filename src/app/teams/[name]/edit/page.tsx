import { Separator } from "@/01-shared/ui/Separator"
import { teamAPI } from "@/02-entities/team"
import { EditTeamForm } from "@/03-features/edit-team"

interface PageProps {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TeamsEditPage({ params }: PageProps) {
  let team = await teamAPI.getOne(params.name)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Информация о команде</h3>
        <p className="text-sm text-muted-foreground">Именно так другие увидят ее на сайте.</p>
      </div>
      <Separator />
      <EditTeamForm team={team} />
    </div>
  )
}
