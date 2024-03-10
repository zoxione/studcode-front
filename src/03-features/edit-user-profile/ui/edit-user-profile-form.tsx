"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { HTMLAttributes, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ImageIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/01-shared/ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Textarea } from "@/01-shared/ui/Textarea"
import {
  ACCEPTED_IMAGE_TYPES,
  User,
  useUpdateOneUserMutation,
  useUploadsOneUserMutation,
  userSchema,
} from "@/02-entities/user"
import { Dropzone } from "@/01-shared/ui/Dropzone"

const editUserProfileSchema = userSchema.pick({ avatar_file: true, full_name: true, about: true })

interface EditUserProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const EditUserProfileForm = ({ user }: EditUserProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mutateAsync: updateUserAsync } = useUpdateOneUserMutation()
  const { mutateAsync: uploadsFilesAsync } = useUploadsOneUserMutation()

  const editUserProfileForm = useForm<z.infer<typeof editUserProfileSchema>>({
    resolver: zodResolver(editUserProfileSchema),
    defaultValues: {
      full_name: {
        name: user?.full_name.name || "",
        surname: user?.full_name.surname || "",
        patronymic: user?.full_name.patronymic || "",
      },
      about: user?.about || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof editUserProfileSchema>) => {
    try {
      setIsLoading(true)
      await uploadsFilesAsync({
        key: user._id,
        files: { avatar_file: values.avatar_file },
      })
      await updateUserAsync({
        key: user._id,
        user: {
          full_name: values.full_name,
          about: values.about,
        },
      })
      toast.success("Профиль обновлен")
      router.push(`/${user.username}`)
    } catch (e) {
      toast.error("Произошла ошибка при обновлении профиля")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...editUserProfileForm}>
      <form onSubmit={editUserProfileForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-row items-center gap-6">
            <FormField
              control={editUserProfileForm.control}
              name="avatar_file"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Dropzone
                      classNameWrapper="w-24 h-24 rounded-full overflow-hidden"
                      accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                      preview
                      classNamePreview="size-full aspect-square"
                      dropContent={<ImageIcon className="h-6 w-6" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col text-sm">
              <span>Разрешенные форматы: JPG, JPEG, PNG, WEBP.</span>
              <span>Максимальный размер: 5 МБ.</span>
            </div>
          </div>
        </div>
        <FormField
          control={editUserProfileForm.control}
          name="full_name.surname"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваша фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editUserProfileForm.control}
          name="full_name.name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editUserProfileForm.control}
          name="full_name.patronymic"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Отчество</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ваше отчество" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editUserProfileForm.control}
          name="about"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>О себе</FormLabel>
              <FormControl>
                <Textarea placeholder="Расскажи нам немного о себе" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Обновить профиль</Button>
      </form>
    </Form>
  )
}

export { EditUserProfileForm }
