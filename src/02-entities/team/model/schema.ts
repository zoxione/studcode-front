import * as z from "zod"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants"

const teamFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Название должно иметь больше 1 символа" })
    .max(16, { message: "Название должно иметь меньше 17 символов" }),
  status: z.enum(["opened", "closed"]),
  about: z
    .string()
    .min(2, { message: "Описание должно иметь больше 1 символа" })
    .max(256, { message: "Описание должно иметь меньше 257 символов" })
    .optional(),
  logo_file: z
    .any()
    .refine((files) => files?.length == 1, "Логотип необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер логотипа - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    ),
})

export { teamFormSchema }
