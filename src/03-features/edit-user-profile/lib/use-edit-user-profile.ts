import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Option } from "@/01-shared/ui/multi-select"
import { User, UserFiles, useUpdateOneUserMutation, useUploadsOneUserMutation, userSchema } from "@/02-entities/user"
import { useGetAllSpecializationsQuery } from "@/02-entities/specialization"

const editUserProfileSchema = userSchema.pick({
  avatar: true,
  avatar_file: true,
  cover_file: true,
  full_name: true,
  about: true,
  links: true,
  specializations: true,
})

interface useEditUserProfileProps {
  user: User
}

const useEditUserProfile = ({ user }: useEditUserProfileProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: updateUserAsync } = useUpdateOneUserMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneUserMutation()
  const { data: specializations } = useGetAllSpecializationsQuery({ limit: 100, order: "name" })
  const specializationsItems: Option[] =
    specializations?.results.map((spec) => ({ label: spec.name, value: spec._id })) || []

  const editUserProfileForm = useForm<z.infer<typeof editUserProfileSchema>>({
    resolver: zodResolver(editUserProfileSchema),
    defaultValues: {
      full_name: {
        name: user?.full_name.name || "",
        surname: user?.full_name.surname || "",
        patronymic: user?.full_name.patronymic || "",
      },
      about: user?.about || "",
      links: user?.links || [],
      specializations: user?.specializations.map((spec) => ({ label: spec.name, value: spec._id })) || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: editUserProfileForm.control,
  })

  const onSubmit = async (values: z.infer<typeof editUserProfileSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      if (values.avatar_file || values.cover_file) {
        let files: UserFiles = {}
        if (values.avatar_file) {
          files.avatar_file = values.avatar_file
        }
        if (values.cover_file) {
          files.cover_file = values.cover_file
        }
        await uploadsFilesAsync({
          key: user._id,
          files,
        })
      }
      await updateUserAsync({
        key: user._id,
        user: {
          full_name: values.full_name,
          about: values.about,
          links: values.links,
          specializations: values.specializations.map((spec) => spec.value),
        },
      })
      toast.success("Профиль обновлен")
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
    fields,
    append,
    remove,
    specializationsItems,
  }
}

export { useEditUserProfile }
