import type { Meta, StoryObj } from "@storybook/react"

import { MultiSelect, Option } from "../ui/multi-select"

const meta = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const OPTIONS: Option[] = [
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Remix", value: "remix" },
  { label: "Svelte", value: "svelte" },
  { label: "Gatsby", value: "gatsby" },
]

export const Default: Story = {
  args: {
    defaultOptions: OPTIONS,
    placeholder: "Выберите фреймворк...",
    emptyIndicator: <span className="text-center">Ничего не найдено</span>,
    className: "mt-36",
  },
}
