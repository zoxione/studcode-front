"use client"

import { UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/RadioGroup"
import { Title } from "@/01-shared/ui/Title"
import { editProjectFormSchema } from "../lib/edit-project-form-schema"

interface ExtrasSectionProps {
  form: UseFormReturn<z.infer<typeof editProjectFormSchema>>
}

const ExtrasSection = ({ form }: ExtrasSectionProps) => {
  return (
    <>
      <div className="space-y-4">
        <Title order={5}>Цены</Title>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Выберите ценообразование</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="free" />
                    </FormControl>
                    <FormLabel className="font-normal">Бесплатно</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="free_options" />
                    </FormControl>
                    <FormLabel className="font-normal">Есть бесплатные опции</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="payment_required" />
                    </FormControl>
                    <FormLabel className="font-normal">Платно</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export { ExtrasSection }
