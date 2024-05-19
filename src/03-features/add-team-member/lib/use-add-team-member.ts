import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useSession } from "next-auth/react"

import { useDebounce } from "@/01-shared/ui/multi-select"
import { useUpdateMembersTeamMutation } from "@/02-entities/team"
import { useGetAllUsersQuery, userAPI, userSchema } from "@/02-entities/user"

const addTeamMemberSchema = userSchema.pick({ username: true })

interface useAddTeamMemberProps {
  teamName: string
}

const useAddTeamMember = ({ teamName }: useAddTeamMemberProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: updateMembersAsync } = useUpdateMembersTeamMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const addTeamMemberForm = useForm<z.infer<typeof addTeamMemberSchema>>({
    resolver: zodResolver(addTeamMemberSchema),
    defaultValues: {
      username: "",
    },
  })

  const debouncedSearchQuery = useDebounce(searchQuery, 200)
  const { data: users } = useGetAllUsersQuery({
    search: debouncedSearchQuery,
    enabled: debouncedSearchQuery !== "",
  })

  const onSubmit = async (values: z.infer<typeof addTeamMemberSchema>) => {
    try {
      setIsLoading(true)
      const user = await userAPI.getOne(values.username)
      if (!user) {
        toast.error("Пользователь не найден")
        return
      }
      if (user.username === session?.user.username) {
        toast.error("Вы не можете добавить себя в команду")
        return
      }
      await updateMembersAsync({
        key: teamName,
        updateMember: {
          member: {
            user: user._id,
            role: "member",
          },
          action: "add",
        },
      })
      toast.success("Пользователю отправлено приглашение на электронную почту")
    } catch (error: any) {
      if (error.message.includes("user") && error.message.includes("Not Found")) {
        toast.error("Пользователь не найден")
        return
      }
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    addTeamMemberForm,
    onSubmit,
    isLoading,
    searchQuery,
    setSearchQuery,
    users: users?.results || [],
  }
}

export { useAddTeamMember }
