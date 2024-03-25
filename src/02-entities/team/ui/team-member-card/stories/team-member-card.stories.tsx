import type { Meta, StoryObj } from "@storybook/react"

import { TeamMemberCard } from "../ui/team-member-card"

const meta = {
  title: "Team/TeamMemberCard",
  component: TeamMemberCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TeamMemberCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    member: {
      role: "owner",
      user: {
        _id: "1",
        username: "user",
        avatar: "",
        full_name: {
          surname: "surname",
          name: "name",
          patronymic: "patronymic",
        },
      },
    },
  },
}
