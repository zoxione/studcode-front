import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useJoinTeamMutation } from "@/02-entities/team"

interface useJoinTeamProps {
  teamName: string
  userId: string
}

const useJoinTeam = ({ teamName, userId }: useJoinTeamProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: joinTeamAsync } = useJoinTeamMutation()

  const handleJoin = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await joinTeamAsync({ key: teamName })
      toast.success("Вы вступили в команду")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleJoin,
    isLoading,
  }
}

export { useJoinTeam }
