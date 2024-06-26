import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useLeaveTeamMutation } from "@/02-entities/team"

interface useLeaveTeamProps {
  teamName: string
  userId: string
}

const useLeaveTeam = ({ teamName, userId }: useLeaveTeamProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: leaveTeamAsync } = useLeaveTeamMutation()

  const handleLeave = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await leaveTeamAsync({ key: teamName })
      toast.success("Вы вышли из команды")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleLeave,
    isLoading,
  }
}

export { useLeaveTeam }
