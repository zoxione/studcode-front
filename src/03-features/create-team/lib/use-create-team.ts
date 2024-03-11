import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { teamSchema, useCreateOneTeamMutation } from "@/02-entities/team"

const createTeamSchema = teamSchema.pick({ name: true, status: true, about: true })

interface useCreateTeamProps {}

const useCreateTeam = ({}: useCreateTeamProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: createTeamAsync } = useCreateOneTeamMutation()

  const createTeamForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      status: "opened",
      about: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof createTeamSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await createTeamAsync({
        name: values.name,
        status: values.status,
        about: values.about || "",
        members: [{ user: session.user._id, role: "owner" }],
      })
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createTeamForm,
    onSubmit,
    isLoading,
  }
}

export { useCreateTeam }
