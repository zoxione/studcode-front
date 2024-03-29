import * as z from "zod"

const reviewSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Минимальная длина - 1 символ." })
    .max(512, { message: "Максимальная длина - 512 символов." }),
  rating: z.number().min(1, { message: "Минимальная оценка - 1." }).max(5, { message: "Максимальная оценка - 5." }),
})

export { reviewSchema }
