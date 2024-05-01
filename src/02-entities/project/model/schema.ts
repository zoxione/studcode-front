import * as z from "zod"

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  PROJECT_PRICE_VALUES,
  PROJECT_STATUS_VALUES,
  PROJECT_TYPE_VALUES,
} from "./constants"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

const screenshotSchema = z
  .any()
  .refine((files) => files?.length >= 1, "Скриншот необходим.")
  .refine((files) => files?.length <= 10, "Максимальное количество скриншотов - 10.")
  .refine(
    (files) => Array.from(files).every((file: any) => file?.size <= MAX_FILE_SIZE),
    `Максимальный размер скриншота - 5MB.`,
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
  )
  .optional()

const projectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Минимальная длина названия - 1 символ." })
    .max(16, { message: "Максимальная длина названия - 24 символов." }),
  tagline: z
    .string()
    .min(1, { message: "Минимальная длина слогана - 1 символ." })
    .max(64, { message: "Максимальная длина слогана - 64 символов." }),
  status: z.enum(PROJECT_STATUS_VALUES),
  type: z.enum(PROJECT_TYPE_VALUES),
  description: z
    .string()
    .min(1, { message: "Минимальная длина описания - 1 символ." })
    .max(512, { message: "Максимальная длина описания - 512 символов." }),
  main_link: z.string().url({ message: "Некорректный URL" }),
  github_link: z
    .union([z.string().length(0), z.string().url({ message: "Некорректный URL для исходного кода." })])
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
        { message: "Некорректная ссылка на YouTube." },
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
    .array(screenshotSchema)
    .max(10, {
      message: "Выберите максимум 10 скриншотов.",
    })
    .optional(),
  price: z.enum(PROJECT_PRICE_VALUES),
  tags: z.array(optionSchema).min(1, { message: "Выберите хотя бы 1 тег." }).max(3, {
    message: "Выберите максимум 3 тега.",
  }),
  team: z
    .union([z.string().length(0), z.string()])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
})

export { projectSchema }
