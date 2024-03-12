import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Team, teamSchema, useUpdateOneTeamMutation, useUploadsOneTeamMutation } from "@/02-entities/team"

const editTeamSchema = teamSchema.pick({ logo_file: true, name: true, status: true, about: true })

interface useEditTeamProps {
  team: Team
}

const useEditTeam = ({ team }: useEditTeamProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: updateTeamAsync } = useUpdateOneTeamMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneTeamMutation()

  const editTeamForm = useForm<z.infer<typeof editTeamSchema>>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      name: team.name,
      status: team.status,
      about: team.about,
    },
  })

  const onSubmit = async (values: z.infer<typeof editTeamSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      if (values.logo_file) {
        await uploadsFilesAsync({
          key: team._id,
          files: { logo_file: values.logo_file },
        })
      }
      const res = await updateTeamAsync({
        key: team._id,
        team: {
          name: values.name,
          status: values.status,
          about: values.about || "",
        },
      })
      toast.success("Команда обновлена")
      router.push(`/teams/${res.slug}`)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    editTeamForm,
    onSubmit,
    isLoading,
  }
}

export { useEditTeam }
