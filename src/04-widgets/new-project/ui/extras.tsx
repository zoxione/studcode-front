import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/Form"
import { RadioGroup, RadioGroupItem } from "@/01-shared/ui/RadioGroup"
import { Title } from "@/01-shared/ui/Title"
import { UseFormReturn } from "react-hook-form"

interface ExtrasProps {
  form: UseFormReturn<
    {
      title: string
      tagline: string
      source_link: string
      description: string
      demo_link: string
      price: "free" | "free_options" | "payment_required"
      github_link?: string | undefined
    },
    any,
    undefined
  >
}

const Extras = ({ form }: ExtrasProps) => {
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

export { Extras }
