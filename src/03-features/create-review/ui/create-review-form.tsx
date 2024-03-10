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
import { reviewSchema, useCreateOneReviewMutation } from "@/02-entities/reviews"

const createReviewSchema = reviewSchema.pick({ text: true, rating: true })

interface CreateReviewFormProps extends HTMLAttributes<HTMLFormElement> {
  project_id: string
}

const CreateReviewForm = ({ project_id, className }: CreateReviewFormProps) => {
  const { data: session } = useSession()
  const { mutate: createOneReview } = useCreateOneReviewMutation()

  const createReviewForm = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  })

  async function onCreate(values: z.infer<typeof createReviewSchema>) {
    if (!session) {
      toast.error("Необходимо авторизоваться")
      return
    }

    createOneReview({ project: project_id, text: values.text, rating: values.rating, reviewer: session.user._id })
  }

  return (
    <Form {...createReviewForm}>
      <form onSubmit={createReviewForm.handleSubmit(onCreate)} className="space-y-3">
        <FormField
          control={createReviewForm.control}
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
            control={createReviewForm.control}
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

export { CreateReviewForm }
