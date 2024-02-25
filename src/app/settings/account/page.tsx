import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Separator } from "@/01-shared/ui/Separator"
import { userAPI } from "@/02-entities/user"
import { AccountForm } from "@/03-features/account-form"

export default async function UserAccount() {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(session?.user._id as string)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Аккаунт</h3>
        <p className="text-sm text-muted-foreground">
          Обновите настройки своей учетной записи. Установите предпочтительный язык и часовой пояс.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} />
    </div>
  )
}
