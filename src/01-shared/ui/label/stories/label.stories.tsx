import type { Meta, StoryObj } from "@storybook/react"

import { Label } from "../ui/label"

const meta = {
  title: "UI/label",
  component: Label,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
}
