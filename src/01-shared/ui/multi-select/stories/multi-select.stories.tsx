import type { Meta, StoryObj } from "@storybook/react"

import { MultiSelect } from "../ui/multi-select"

const meta = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: "React", label: "React" },
      { value: "Angular", label: "Angular" },
      { value: "Vue", label: "Vue" },
      { value: "Svelte", label: "Svelte" },
    ],
    placeholder: "Выберите фреймворк",
    emptyIndicator: <span className="text-center">Ничего не найдено</span>,
  },
}
