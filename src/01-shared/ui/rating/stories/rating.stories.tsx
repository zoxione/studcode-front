import type { Meta, StoryObj } from "@storybook/react"

import { Rating } from "../ui/rating"

const meta = {
  title: "UI/Rating",
  component: Rating,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 3,
  },
}
