import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { reviewSchema, useCreateOneReviewMutation } from "@/02-entities/review"

const createReviewSchema = reviewSchema.pick({ text: true, rating: true })

interface useCreateReviewProps {
  projectId: string
}

const useCreateReview = ({ projectId }: useCreateReviewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: createReviewAsync } = useCreateOneReviewMutation()

  const createReviewForm = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  })

  const onSubmit = async (values: z.infer<typeof createReviewSchema>) => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await createReviewAsync({
        project: projectId,
        text: values.text,
        rating: values.rating,
        reviewer: session.user._id,
      })
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createReviewForm,
    onSubmit,
    isLoading,
  }
}

export { useCreateReview }
