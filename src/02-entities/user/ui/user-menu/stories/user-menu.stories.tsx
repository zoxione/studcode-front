import type { Meta, StoryFn, StoryObj } from "@storybook/react"

import { TooltipProvider } from "@/01-shared/ui/tooltip"
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

const mockUser = {
  _id: "1",
  username: "user",
  avatar: "",
  email: "email@email.com",
}

export const Default: StoryFn = () => (
  <TooltipProvider>
    <UserMenu user={mockUser} />
  </TooltipProvider>
)
