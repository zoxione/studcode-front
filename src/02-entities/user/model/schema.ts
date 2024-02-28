import * as z from "zod"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants"

const fullNameFormSchema = z.object({
  surname: z
    .string()
    .min(2, { message: "Фамилия должна иметь больше 1 символа" })
    .max(32, { message: "Фамилия должна иметь меньше 33 символов" }),
  name: z
    .string()
    .min(2, { message: "Имя должно иметь больше 1 символа" })
    .max(32, { message: "Имя должно иметь меньше 33 символов" }),
  patronymic: z
    .string()
    .min(2, { message: "Отчество должно иметь больше 1 символа" })
    .max(32, { message: "Отчество должно иметь меньше 33 символов" })
    .optional(),
})

const userFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Имя пользователя должно иметь больше 1 символа" })
    .max(16, { message: "Имя пользователя должно иметь меньше 17 символов" }),
  email: z.string().email({ message: "Некорректная почта" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен иметь больше 5 символов" })
    .max(24, { message: "Пароль должен иметь меньше 25 символов" }),
  full_name: fullNameFormSchema,
  about: z
    .string()
    .min(2, { message: "Описание должно иметь больше 1 символа" })
    .max(256, { message: "Описание должно иметь меньше 257 символов" })
    .optional(),
  avatar_file: z
    .any()
    .refine((files) => files?.length == 1, "Аватар необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер аватара - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    ),
})

export { fullNameFormSchema, userFormSchema }
