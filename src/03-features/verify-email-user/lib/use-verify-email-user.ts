import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"
import { toast } from "sonner"

import { authAPI } from "@/03-features/auth"

interface useVerifyEmailUserProps {}

const useVerifyEmailUser = ({}: useVerifyEmailUserProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleVerifyEmail = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await authAPI.verifyEmail()
      toast.success("Письмо отправлено на вашу почту")
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleVerifyEmail,
    isLoading,
  }
}

export { useVerifyEmailUser }
