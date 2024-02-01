import { Calendar } from "../ui/Calendar"

import type { Meta, StoryObj } from "@storybook/react"


const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: "single",
    selected: new Date(),
    onSelect: () => {},
    className: "rounded-md border",
  },
}
