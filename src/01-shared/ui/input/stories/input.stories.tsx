import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "../ui/input"

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "email",
    placeholder: "Email",
  },
}

export const File: Story = {
  args: {
    type: "file",
  },
}

export const Disabled: Story = {
  args: {
    type: "email",
    placeholder: "Email",
    disabled: true,
  },
}
