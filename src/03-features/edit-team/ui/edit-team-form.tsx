"use client"

import { ImageIcon, ReloadIcon } from "@radix-ui/react-icons"
import Image from "next/image"

import { Button } from "@/01-shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Input } from "@/01-shared/ui/input"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/radio-group"
import { Textarea } from "@/01-shared/ui/textarea"
import { useEditTeam } from "../lib/use-edit-team"
import { ACCEPTED_IMAGE_TYPES, TEAM_STATUS_VALUES, Team, prettyStatus } from "@/02-entities/team"
import { Dropzone } from "@/01-shared/ui/dropzone"

interface EditTeamFormProps {
  team: Team
}

const EditTeamForm = ({ team }: EditTeamFormProps) => {
  const { editTeamForm, onSubmit, isLoading } = useEditTeam({ team })

  return (
    <Form {...editTeamForm}>
      <form onSubmit={editTeamForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-row items-center gap-6">
            <FormField
              control={editTeamForm.control}
              name="logo_file"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Dropzone
                      classNameWrapper="w-24 h-24 rounded-full overflow-hidden"
                      accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                      preview
                      classNamePreview="size-full aspect-square object-cover"
                      dropContent={
                        team.logo !== "" ? (
                          <Image src={team.logo} alt={`${team.name}-logo`} fill className="object-cover" />
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
          control={editTeamForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Супер команда" {...field} />
              </FormControl>
              <FormDescription>Это публичное название вашей команды</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editTeamForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {TEAM_STATUS_VALUES.map((status) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={status}>
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal">{prettyStatus(status)}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editTeamForm.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Супер команда" rows={3} className="resize-y" {...field} />
              </FormControl>
              <FormDescription>Описание вашей команды</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Обновить"}
        </Button>
      </form>
    </Form>
  )
}

export { EditTeamForm }
