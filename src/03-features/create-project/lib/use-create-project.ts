import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useState } from "react"

import { projectSchema, useCreateOneProjectMutation } from "@/02-entities/project"

const createProjectSchema = projectSchema.pick({ title: true })

interface useCreateProjectProps {}

const useCreateProject = ({}: useCreateProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutateAsync: createProjectAsync } = useCreateOneProjectMutation()

  const createProjectForm = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      const res = await createProjectAsync({
        title: values.title,
        creator: session.user._id,
      })
      toast.success("Проект создан")
      router.push(`/projects/${res.slug}/edit`)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createProjectForm,
    onSubmit,
    isLoading,
  }
}

export { useCreateProject }
