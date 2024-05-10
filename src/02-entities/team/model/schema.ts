import * as z from "zod"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, TEAM_STATUS_VALUES } from "./constants"

const teamSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Минимальная длина названия - 1 символ." })
    .max(16, { message: "Максимальная длина названия - 16 символов." }),
  about: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(1, { message: "Минимальная длина описания - 1 символ." })
        .max(512, { message: "Максимальная длина описания - 512 символов." }),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  status: z.enum(TEAM_STATUS_VALUES),
  logo_file: z
    .union([
      z.null(),
      z
        .any()
        .refine((files) => files?.length == 1, "Логотип необходим.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер логотипа - 5MB.`)
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
        ),
    ])
    .optional(),
})

export { teamSchema }
