import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useState } from "react"

import { userAPI, userSchema } from "@/02-entities/user"
import { useAddMemberTeamMutation } from "@/02-entities/team"

const addTeamMemberSchema = userSchema.pick({ username: true })

interface useAddTeamMemberProps {
  teamName: string
}

const useAddTeamMember = ({ teamName }: useAddTeamMemberProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync: addTeamMemberAsync } = useAddMemberTeamMutation()

  const addTeamMemberForm = useForm<z.infer<typeof addTeamMemberSchema>>({
    resolver: zodResolver(addTeamMemberSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof addTeamMemberSchema>) => {
    try {
      setIsLoading(true)
      const user = await userAPI.getOne(values.username)
      if (!user) {
        toast.error("Пользователь не найден")
        return
      }
      await addTeamMemberAsync({
        key: teamName,
        userId: user._id,
        role: "member",
      })
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
  }
}

export { useAddTeamMember }
