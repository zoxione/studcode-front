import { Separator } from "@/01-shared/ui/Separator"
import { AddMember } from "@/03-features/add-member"
import { MembersTable } from "@/04-widgets/members-table"

interface PageProps {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TeamsEditPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Участники</h3>
        <p className="text-sm text-muted-foreground">Управляйте участниками.</p>
      </div>
      <Separator />
      <AddMember teamName={params.name} />
      <MembersTable teamName={params.name} />
    </div>
  )
}
