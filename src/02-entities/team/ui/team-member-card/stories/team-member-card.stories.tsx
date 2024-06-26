import type { Meta, StoryObj } from "@storybook/react"

import { TeamMemberCard } from "../ui/team-member-card"
import { TeamMember } from "@/02-entities/team"

const meta = {
  title: "Team/TeamMemberCard",
  component: TeamMemberCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TeamMemberCard>

export default meta
type Story = StoryObj<typeof meta>

const mockTeamMember: TeamMember = {
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
    email: "email",
    specializations: [],
  },
}

export const Default: Story = {
  args: {
    member: mockTeamMember,
  },
}
