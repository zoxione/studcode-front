import { Separator } from "@/01-shared/ui/separator"
import { teamAPI } from "@/02-entities/team"
import { AddTeamMemberForm } from "@/03-features/add-team-member"
import { TeamMembersTable } from "@/04-widgets/team-members-table"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: PageProps) {
  let team = await teamAPI.getOne(params.slug)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Участники</h3>
        <p className="text-sm text-muted-foreground">Управляйте участниками.</p>
      </div>
      <Separator />
      <AddTeamMemberForm teamName={team.name} />
      <TeamMembersTable teamName={team.name} />
    </div>
  )
}
