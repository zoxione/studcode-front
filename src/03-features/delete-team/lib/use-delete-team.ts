import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useDeleteOneTeamMutation } from "@/02-entities/team"

interface useDeleteTeamProps {
  teamId: string
}

const useDeleteTeam = ({ teamId }: useDeleteTeamProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: deleteTeamAsync } = useDeleteOneTeamMutation()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await deleteTeamAsync(teamId)
      toast.success("Команда удалена")
      router.push(`/${session.user._id}`)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleDelete,
    isLoading,
  }
}

export { useDeleteTeam }
