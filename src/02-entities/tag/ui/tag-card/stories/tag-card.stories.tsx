import type { Meta, StoryObj } from "@storybook/react"

import { TagCard } from "../ui/tag-card"
import { Tag } from "@/02-entities/tag"

const meta = {
  title: "Tag/TagCard",
  component: TagCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TagCard>

export default meta
type Story = StoryObj<typeof meta>

const mockTag: Tag = {
  _id: "1",
  name: "Tag",
  icon: "🥳",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  slug: "tag",
  created_at: "2024-01-01T12:09:12.955+00:00",
  updated_at: "2024-01-01T12:09:12.955+00:00",
}

export const Default: Story = {
  args: {
    tag: mockTag,
  },
}
