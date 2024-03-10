import { Separator } from "@/01-shared/ui/Separator"
import { teamAPI } from "@/02-entities/team"

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
    </div>
  )
}
