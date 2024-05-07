import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import {
  Team,
  TeamFilesResponse,
  teamSchema,
  useUpdateOneTeamMutation,
  useUploadsOneTeamMutation,
} from "@/02-entities/team"

const editTeamSchema = teamSchema.pick({ logo_file: true, name: true, status: true, about: true })

interface useEditTeamProps {
  team: Team
  files: TeamFilesResponse
}

const useEditTeam = ({ team, files }: useEditTeamProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: updateTeamAsync } = useUpdateOneTeamMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneTeamMutation()

  const editTeamForm = useForm<z.infer<typeof editTeamSchema>>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      name: team.name,
      status: team.status,
      about: team.about,
      logo_file: files.logo_file !== null ? [files.logo_file] : null,
    },
  })

  const onSubmit = async (values: z.infer<typeof editTeamSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await uploadsFilesAsync({
        key: team._id,
        files: { logo_file: values.logo_file },
      })
      await updateTeamAsync({
        key: team._id,
        team: {
          name: values.name,
          status: values.status,
          about: values.about || "",
        },
      })
      toast.success("Команда обновлена")
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
