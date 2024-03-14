import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "../ui/badge"

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    children: "Badge",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Badge",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Badge",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Badge",
  },
}
