import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { User, useUpdateOneUserMutation, useUploadsOneUserMutation, userSchema } from "@/02-entities/user"

const editUserProfileSchema = userSchema.pick({ avatar: true, avatar_file: true, full_name: true, about: true })

interface useEditUserProfileProps {
  user: User
}

const useEditUserProfile = ({ user }: useEditUserProfileProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: updateUserAsync } = useUpdateOneUserMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneUserMutation()

  const editUserProfileForm = useForm<z.infer<typeof editUserProfileSchema>>({
    resolver: zodResolver(editUserProfileSchema),
    defaultValues: {
      full_name: {
        name: user?.full_name.name || "",
        surname: user?.full_name.surname || "",
        patronymic: user?.full_name.patronymic || "",
      },
      about: user?.about || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof editUserProfileSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      if (values.avatar_file) {
        await uploadsFilesAsync({
          key: user._id,
          files: { avatar_file: values.avatar_file },
        })
      }
      await updateUserAsync({
        key: user._id,
        user: {
          full_name: values.full_name,
          about: values.about,
        },
      })
      toast.success("Профиль обновлен")
      router.push(`/${user.username}`)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    editUserProfileForm,
    onSubmit,
    isLoading,
  }
}

export { useEditUserProfile }
