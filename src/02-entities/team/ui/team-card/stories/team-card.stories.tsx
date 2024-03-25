import type { Meta, StoryObj } from "@storybook/react"

import { TeamCard } from "../ui/team-card"

const meta = {
  title: "Team/TeamCard",
  component: TeamCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TeamCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    team: {
      _id: "1",
      name: "Team",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quidem. Nihil, quidem. Nihil, quidem. Nihil, quidem.",
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
          },
        },
      ],
      created_at: "2024-01-01T12:09:12.955+00:00",
      updated_at: "2024-01-01T12:09:12.955+00:00",
    },
  },
}
