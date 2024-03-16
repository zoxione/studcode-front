import { useSession } from "next-auth/react"
import { useState, MouseEvent } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useGetOneProjectQuery, useVoteOneProjectMutation } from "@/02-entities/project"

interface useVoteProjectProps {
  projectId: string
}

const useVoteProject = ({ projectId }: useVoteProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { data: project } = useGetOneProjectQuery(projectId)
  const { mutateAsync: voteProjectAsync } = useVoteOneProjectMutation()

  const handleVote = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await voteProjectAsync(projectId)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleVote,
    isLoading,
    project,
  }
}

export { useVoteProject }
