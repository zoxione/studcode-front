import type { Meta, StoryFn, StoryObj } from "@storybook/react"

import { TeamCard } from "../ui/team-card"
import { Team } from "@/02-entities/team"
import { TooltipProvider } from "@/01-shared/ui/tooltip"

const meta = {
  title: "Team/TeamCard",
  component: TeamCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TeamCard>

export default meta
type Story = StoryObj<typeof meta>

const mockTeam: Team = {
  _id: "1",
  name: "Team",
  about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  status: "opened",
  logo: "",
  slug: "team",
  members: [
    {
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
    },
  ],
  created_at: "2024-01-01T12:09:12.955+00:00",
  updated_at: "2024-01-01T12:09:12.955+00:00",
}

export const Default: StoryFn = () => (
  <TooltipProvider>
    <TeamCard team={mockTeam} />
  </TooltipProvider>
)
