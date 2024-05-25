import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Separator } from "@/01-shared/ui/separator"
import { userAPI } from "@/02-entities/user"
import { EditUserAccount } from "@/03-features/edit-user-account"
import { DeleteUserButton } from "@/03-features/delete-user"

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(session?.user._id as string)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Аккаунт</h3>
        <p className="text-sm text-muted-foreground">Обновите настройки своей учетной записи.</p>
      </div>
      <Separator />
      <EditUserAccount userId={user._id} />
      <div className="space-y-2">
        <div>
          <h3 className="text-base">Удалить аккаунт</h3>
          <p className="text-sm text-muted-foreground">
            Удаление приведет к удалению всех данных, которые были связаны с вашей учетной записью.
          </p>
        </div>
        <DeleteUserButton userId={user._id} />
      </div>
    </div>
  )
}
