import * as z from "zod"

import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constants"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

const editProjectFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Минимальная длина заголовка - 2 символа" })
    .max(20, { message: "Максимальная длина заголовка - 20 символов" }),
  tagline: z
    .string()
    .min(2, { message: "Минимальная длина слогана - 2 символа" })
    .max(50, { message: "Максимальная длина слогана - 50 символов" }),
  source_link: z.string().url({ message: "Некорректный URL для исходного кода" }),
  github_link: z.string().url({ message: "Некорректный URL для исходного кода" }).optional(),
  description: z
    .string()
    .min(2, { message: "Минимальная длина описания - 2 символа" })
    .max(255, { message: "Максимальная длина описания - 255 символов" }),
  tags: z.array(optionSchema).min(1, { message: "Выберите хотя бы 1 тег" }).max(3, {
    message: "Выберите максимум 3 тега",
  }),
  logo_file: z
    .any()
    .refine((files) => files?.length == 1, "Логотип необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер логотипа - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    ),
  screenshots_files: z
    .any()
    .refine((files) => files?.length >= 1, "Скриншоты необходимы.")
    .refine((files) => files?.length <= 10, "Максимальное количество скриншотов - 10.")
    .refine(
      (files) => Array.from(files).every((file: any) => file?.size <= MAX_FILE_SIZE),
      `Максимальный размер скриншота - 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    ),
  demo_link: z
    .string()
    .refine(
      (value) => {
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        return youtubeRegex.test(value)
      },
      { message: "Некорректная ссылка на YouTube" },
    )
    .optional(),
  price: z.enum(["free", "free_options", "payment_required"]),
})

export { editProjectFormSchema }
