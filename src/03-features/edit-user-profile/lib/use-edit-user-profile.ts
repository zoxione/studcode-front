import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Option } from "@/01-shared/ui/multi-select"
import {
  User,
  UserFiles,
  UserFilesResponse,
  useUpdateOneUserMutation,
  useUploadsOneUserMutation,
  userSchema,
} from "@/02-entities/user"
import { useGetAllSpecializationsQuery } from "@/02-entities/specialization"
import { useGetAllEducationsQuery } from "@/02-entities/education"

const editUserProfileSchema = userSchema.pick({
  avatar: true,
  avatar_file: true,
  cover_file: true,
  full_name: true,
  about: true,
  links: true,
  specializations: true,
  education: true,
})

interface useEditUserProfileProps {
  user: User
  files: UserFilesResponse
}

const useEditUserProfile = ({ user, files }: useEditUserProfileProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: updateUserAsync } = useUpdateOneUserMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneUserMutation()
  const { data: specializations } = useGetAllSpecializationsQuery({ limit: 100, order: "name" })
  const specializationsItems: Option[] =
    specializations?.results.map((spec) => ({ label: spec.name, value: spec._id })) || []
  const { data: educations } = useGetAllEducationsQuery({ limit: 500, order: "abbreviation" })

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
      avatar_file: files.avatar_file !== null ? [files.avatar_file] : null,
      cover_file: files.cover_file !== null ? [files.cover_file] : null,
      specializations: user?.specializations.map((spec) => ({ label: spec.name, value: spec._id })) || [],
      education: user?.education?._id || "",
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
      const files: UserFiles = {
        ...(values.avatar_file && values.avatar_file[0]?.lastModified && { avatar_file: values.avatar_file }),
        ...(values.cover_file && values.cover_file[0]?.lastModified && { cover_file: values.cover_file }),
      }
      if (Object.keys(files).length > 0) {
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
          education: values.education === "" ? null : values.education,
        },
      })
      toast.success("Профиль обновлен")
    } catch (error) {
      console.error(error)
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
    educations,
  }
}

export { useEditUserProfile }
