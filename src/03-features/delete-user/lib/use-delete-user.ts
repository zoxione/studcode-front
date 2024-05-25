import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useDeleteOneUserMutation } from "@/02-entities/user"

interface useDeleteUserProps {
  userId: string
}

const useDeleteUser = ({ userId }: useDeleteUserProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: deleteUserAsync } = useDeleteOneUserMutation()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await deleteUserAsync(userId)
      await signOut()
      router.push(`/`)
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

export { useDeleteUser }
