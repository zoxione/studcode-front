import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { User, useUpdateOneUserMutation, userSchema } from "@/02-entities/user"

const editUserAccountSchema = userSchema.pick({ email: true, username: true })

interface useEditUserAccountProps {
  user: User
}

const useEditUserAccount = ({ user }: useEditUserAccountProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: updateUserAccountAsync } = useUpdateOneUserMutation()

  const editUserAccountForm = useForm<z.infer<typeof editUserAccountSchema>>({
    resolver: zodResolver(editUserAccountSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
    },
  })

  const onSubmit = async (values: z.infer<typeof editUserAccountSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      const res = await updateUserAccountAsync({
        key: user._id,
        user: {
          email: values.email,
          username: values.username,
        },
      })
      toast.success("Данные обновлены")
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    editUserAccountForm,
    onSubmit,
    isLoading,
  }
}

export { useEditUserAccount }
