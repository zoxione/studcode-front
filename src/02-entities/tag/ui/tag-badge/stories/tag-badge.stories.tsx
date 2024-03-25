import type { Meta, StoryObj } from "@storybook/react"

import { TagBadge } from "../ui/tag-badge"

const meta = {
  title: "Tag/TagBadge",
  component: TagBadge,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TagBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tag: {
      _id: "1",
      name: "Tag",
      icon: "🏷",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quidem. Nihil, quidem. Nihil, quidem. Nihil, quidem.",
      slug: "tag",
      created_at: "2024-01-01T12:09:12.955+00:00",
      updated_at: "2024-01-01T12:09:12.955+00:00",
    },
  },
}
