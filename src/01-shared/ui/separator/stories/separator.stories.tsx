import type { Meta, StoryObj } from "@storybook/react"

import { Separator } from "../ui/separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
