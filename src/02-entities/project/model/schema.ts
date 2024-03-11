import * as z from "zod"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

const projectSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Минимальная длина заголовка - 2 символа" })
    .max(20, { message: "Максимальная длина заголовка - 20 символов" }),
  tagline: z
    .string()
    .min(2, { message: "Минимальная длина слогана - 2 символа" })
    .max(50, { message: "Максимальная длина слогана - 50 символов" }),
  status: z.enum(["draft", "published", "archived"]),
  type: z.enum(["web", "mobile", "desktop", "iot", "game", "ui_ux", "other"]),
  description: z
    .string()
    .min(2, { message: "Минимальная длина описания - 2 символа" })
    .max(255, { message: "Максимальная длина описания - 255 символов" }),
  main_link: z.string().url({ message: "Некорректный URL" }),
  github_link: z
    .union([z.string().length(0), z.string().url({ message: "Некорректный URL для исходного кода" })])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  youtube_link: z
    .union([
      z.string().length(0),
      z.string().refine(
        (value) => {
          const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
          return youtubeRegex.test(value)
        },
        { message: "Некорректная ссылка на YouTube" },
      ),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  logo_file: z
    .any()
    .refine((files) => files?.length == 1, "Логотип необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер логотипа - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    )
    .optional(),
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
    )
    .optional(),
  price: z.enum(["free", "free_options", "payment_required"]),
  tags: z.array(optionSchema).min(1, { message: "Выберите хотя бы 1 тег" }).max(3, {
    message: "Выберите максимум 3 тега",
  }),
})

export { projectSchema }
