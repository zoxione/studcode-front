"use client"

import { HTMLAttributes } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/01-shared/ui/Form"
import { Rating } from "@/01-shared/ui/Rating"
import { Textarea } from "@/01-shared/ui/Textarea"
import { useCreateReview } from "../lib/use-create-review"

interface CreateReviewFormProps extends HTMLAttributes<HTMLFormElement> {
  projectId: string
}

const CreateReviewForm = ({ projectId }: CreateReviewFormProps) => {
  const { createReviewForm, onSubmit, isLoading } = useCreateReview({ projectId })

  return (
    <Form {...createReviewForm}>
      <form onSubmit={createReviewForm.handleSubmit(onSubmit)} className="space-y-3">
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Отправить"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreateReviewForm }
