"use client"

import { ImageIcon, ReloadIcon } from "@radix-ui/react-icons"
import { HTMLAttributes } from "react"

import { Button } from "@/01-shared/ui/Button"
import { Dropzone } from "@/01-shared/ui/Dropzone"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { Input } from "@/01-shared/ui/Input"
import { Textarea } from "@/01-shared/ui/Textarea"
import { ACCEPTED_IMAGE_TYPES, User } from "@/02-entities/user"
import { useEditUserProfile } from "../lib/use-edit-user-profile"

interface EditUserProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const EditUserProfileForm = ({ user }: EditUserProfileFormProps) => {
  const { editUserProfileForm, onSubmit, isLoading } = useEditUserProfile({ user })

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
                      dropContent={
                        user.avatar !== "" ? (
                          <img src={user.avatar} alt="avatar" className="max-h-[200px] size-full aspect-square" />
                        ) : (
                          <ImageIcon className="h-6 w-6" />
                        )
                      }
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Обновить профиль"}
        </Button>
      </form>
    </Form>
  )
}

export { EditUserProfileForm }
