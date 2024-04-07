import { Label } from "@/01-shared/ui/label"
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
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="delete" className="flex flex-col space-y-1">
          <span>Удалить команду</span>
          <span className="font-normal leading-snug text-muted-foreground">
            Удалить команду и все данные (восстановить невозможно).
          </span>
        </Label>
        <DeleteTeamButton id="delete" teamId={team._id} />
      </div>
    </div>
  )
}
