import * as z from "zod"

import { linkSchema } from "@/01-shared/types/link"
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants"

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

const fullNameSchema = z.object({
  surname: z
    .string()
    .min(1, { message: "Минимальная длина фамилии - 1 символ." })
    .max(32, { message: "Максимальная длина фамилии - 32 символа." }),
  name: z
    .string()
    .min(1, { message: "Минимальная длина имени - 1 символ." })
    .max(32, { message: "Максимальная длина имени - 32 символа." }),
  patronymic: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(1, { message: "Минимальная длина отчества - 1 символ." })
        .max(32, { message: "Максимальная длина отчества - 32 символа." }),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
})

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Минимальная длина имени пользователя - 3 символа." })
    .max(16, { message: "Максимальная длина имени - 24 символов." }),
  email: z.string().email({ message: "Некорректная почта." }),
  password: z
    .string()
    .min(6, { message: "Минимальная длина пароля - 6 символов." })
    .max(24, { message: "Максимальная длина пароля - 24 символа." }),
  full_name: fullNameSchema,
  avatar_file: z
    .any()
    .refine((files) => files?.length == 1, "Аватар необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер аватара - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    )
    .optional(),
  cover_file: z
    .any()
    .refine((files) => files?.length == 1, "Обложка необходима.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер обложки - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    )
    .optional(),
  about: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(1, { message: "Минимальная длина о себе - 1 символ." })
        .max(512, { message: "Максимальная длина о себе - 512 символов." }),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  links: z.array(linkSchema).max(5, {
    message: "Максимальное количество ссылок - 5.",
  }),
  specializations: z.array(optionSchema).max(3, {
    message: "Максимальное количество специализаций - 3.",
  }),
})

export { fullNameSchema, userSchema }
