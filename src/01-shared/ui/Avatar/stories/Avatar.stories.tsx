import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/zoxione.png" alt="@zoxione" />
        <AvatarFallback>Z</AvatarFallback>
      </>
    ),
  },
}

export const NoImage: Story = {
  args: {
    children: (
      <>
        <AvatarFallback>Z</AvatarFallback>
      </>
    ),
  },
}
