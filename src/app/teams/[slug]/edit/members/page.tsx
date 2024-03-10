import { Separator } from "@/01-shared/ui/Separator"
import { teamAPI } from "@/02-entities/team"
import { AddTeamMemberForm } from "@/03-features/add-team-member"
import { MembersTable } from "@/04-widgets/members-table"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TeamsEditPage({ params }: PageProps) {
  let team = await teamAPI.getOne(params.slug)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Участники</h3>
        <p className="text-sm text-muted-foreground">Управляйте участниками.</p>
      </div>
      <Separator />
      <AddTeamMemberForm teamName={team.name} />
      <MembersTable teamName={team.name} />
    </div>
  )
}
