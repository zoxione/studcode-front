import type { Meta, StoryObj } from "@storybook/react"

import { Textarea } from "../ui/textarea"

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter your message here",
  },
}

export const Disable: Story = {
  args: {
    placeholder: "Enter your message here",
    disabled: true,
  },
}
