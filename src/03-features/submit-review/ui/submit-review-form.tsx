"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useSession } from "next-auth/react"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Rating } from "@/01-shared/ui/Rating"
import { Textarea } from "@/01-shared/ui/Textarea"
import { useCreateOneReviewMutation } from "@/02-entities/reviews"

const submitReviewFormSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Минимальная длина 1 символ" })
    .max(256, { message: "Максимальная длина 256 символов" }),
  rating: z.number().min(1, { message: "Минимальная оценка 1" }).max(5, { message: "Максимальная оценка 5" }),
})

interface SubmitReviewFormProps extends HTMLAttributes<HTMLFormElement> {
  project_id: string
}

const SubmitReviewForm = ({ project_id, className }: SubmitReviewFormProps) => {
  const { data: session } = useSession()
  const { mutate: createOneReview } = useCreateOneReviewMutation()

  const submitReviewForm = useForm<z.infer<typeof submitReviewFormSchema>>({
    resolver: zodResolver(submitReviewFormSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof submitReviewFormSchema>) {
    if (!session) {
      toast.error("Необходимо авторизоваться")
      return
    }

    createOneReview({ project: project_id, text: values.text, rating: values.rating, reviewer: session.user._id })
  }

  return (
    <Form {...submitReviewForm}>
      <form onSubmit={submitReviewForm.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={submitReviewForm.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Оставить обзор" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center justify-between">
          <FormField
            control={submitReviewForm.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="mb-auto">
                <FormControl>
                  <Rating defaultValue={field.value} onSelectedClick={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="">
            Отправить
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { SubmitReviewForm }
