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
    value: [{ value: "React", label: "React" }],
    defaultOptions: [
      { value: "react", label: "React" },
      { value: "angular", label: "Angular" },
      { value: "bue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
    placeholder: "Выберите фреймворк",
    emptyIndicator: <span className="text-center">Ничего не найдено</span>,
    className: "mt-36",
  },
}
