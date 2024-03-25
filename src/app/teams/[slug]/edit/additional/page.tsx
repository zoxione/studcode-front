import { Separator } from "@/01-shared/ui/separator"
import { teamAPI } from "@/02-entities/team"
import { DeleteTeamButton } from "@/03-features/delete-team"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: PageProps) {
  let team = await teamAPI.getOne(params.slug)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Дополнительно</h3>
        <p className="text-sm text-muted-foreground">Дополнительные настройки команды.</p>
      </div>
      <Separator />
      <div className="flex flex-row items-center justify-between">
        <span>Удалить команду и все данные (восстановить невозможно)</span>
        <DeleteTeamButton teamId={team._id} />
      </div>
    </div>
  )
}
