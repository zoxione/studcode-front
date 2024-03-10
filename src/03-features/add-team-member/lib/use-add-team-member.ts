import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { userAPI, userSchema } from "@/02-entities/user"
import { useAddMemberTeamMutation } from "@/02-entities/team"

const addTeamMemberSchema = userSchema.pick({ username: true })

interface useAddTeamMemberProps {
  teamName: string
}

const useAddTeamMember = ({ teamName }: useAddTeamMemberProps) => {
  const { mutate: addTeamMember, status } = useAddMemberTeamMutation()

  const addTeamMemberForm = useForm<z.infer<typeof addTeamMemberSchema>>({
    resolver: zodResolver(addTeamMemberSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(values: z.infer<typeof addTeamMemberSchema>) {
    try {
      const user = await userAPI.getOne(values.username)
      if (user) {
        addTeamMember({
          key: teamName,
          userId: user._id,
          role: "member",
        })
      }
    } catch (error) {
      toast.error("Пользователь не найден")
    }
  }

  return {
    addTeamMemberForm,
    onSubmit,
    status,
  }
}

export { useAddTeamMember }
