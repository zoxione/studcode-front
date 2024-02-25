import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Separator } from "@/01-shared/ui/Separator"
import { userAPI } from "@/02-entities/user"
import { ProfileForm } from "@/03-features/profile-form"

export default async function UserProfile() {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(session?.user._id as string)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">Именно так другие увидят вас на сайте.</p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  )
}
