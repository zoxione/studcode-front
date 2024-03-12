"use client"

import { ImageIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { HTMLAttributes } from "react"

import { Button } from "@/01-shared/ui/button"
import { Dropzone } from "@/01-shared/ui/dropzone"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { Textarea } from "@/01-shared/ui/textarea"
import { ACCEPTED_IMAGE_TYPES, User } from "@/02-entities/user"
import { useEditUserProfile } from "../lib/use-edit-user-profile"
import { cn } from "@/01-shared/utils/cn"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/select"
import { linkTypeValues } from "@/01-shared/types/link"
import { prettyLinkType } from "@/01-shared/utils/pretty-link-type"

interface EditUserProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  user: User
}

const EditUserProfileForm = ({ user }: EditUserProfileFormProps) => {
  const { editUserProfileForm, onSubmit, isLoading, fields, append, remove } = useEditUserProfile({ user })

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
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <FormLabel className={cn(index !== 0 && "sr-only")}>Ссылки</FormLabel>
              <FormDescription className={cn(index !== 0 && "sr-only")}>
                Добавьте ссылки на свой веб-сайт, блог или профили в социальных сетях (максимально 5). Ссылки будут
                отображаться в профиле.
              </FormDescription>
              <div className="grid grid-cols-6 gap-2">
                <FormField
                  control={editUserProfileForm.control}
                  name={`links.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Тип ссылки" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {linkTypeValues.map((type) => (
                              <SelectItem key={type} value={type}>
                                {prettyLinkType(type)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editUserProfileForm.control}
                  name={`links.${index}.label`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <Input placeholder="Название ссылки" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editUserProfileForm.control}
                  name={`links.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="col-span-3 space-y-0 flex flex-row items-center gap-2">
                      <FormControl>
                        <Input placeholder="URL ссылки" {...field} />
                      </FormControl>
                      <FormMessage />
                      <Button onClick={() => remove(index)} type="button" variant="destructive" size="icon">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isLoading || fields.length >= 5}
            onClick={() => append({ type: "other", label: "", url: "" })}
          >
            Добавить ссылку
          </Button>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Обновить профиль"}
        </Button>
      </form>
    </Form>
  )
}

export { EditUserProfileForm }
