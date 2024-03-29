import type { Meta, StoryObj } from "@storybook/react"

import { UserMenu } from "../ui/user-menu"

const meta = {
  title: "User/UserMenu",
  component: UserMenu,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      _id: "1",
      username: "user",
      avatar: "",
      email: "email@email.com",
    },
  },
}
