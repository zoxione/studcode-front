import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"
import { toast } from "sonner"

import { useVoteOneProjectMutation } from "@/02-entities/project"

interface useVoteProjectProps {
  projectId: string
}

const useVoteProject = ({ projectId }: useVoteProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: voteProjectAsync } = useVoteOneProjectMutation()

  const handleVote = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      if (!session) {
        router.push("?dialog=auth", { scroll: false })
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
  }
}

export { useVoteProject }
