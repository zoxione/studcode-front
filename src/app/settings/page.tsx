import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Separator } from "@/01-shared/ui/separator"
import { userAPI } from "@/02-entities/user"
import { EditUserProfile } from "@/03-features/edit-user-profile"

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(session?.user._id as string)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">Именно так другие увидят вас на сайте.</p>
      </div>
      <Separator />
      <EditUserProfile userId={user._id} />
    </div>
  )
}
