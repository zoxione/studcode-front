import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "../ui/Checkbox"

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disable: Story = {
  args: {
    disabled: true,
  },
}
