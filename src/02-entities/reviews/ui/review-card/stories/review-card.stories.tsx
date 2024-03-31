import type { Meta, StoryObj } from "@storybook/react"

import { ReviewCard } from "../ui/review-card"
import { Review } from "@/02-entities/reviews"

const meta = {
  title: "Review/ReviewCard",
  component: ReviewCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ReviewCard>

export default meta
type Story = StoryObj<typeof meta>

const mockReview: Review = {
  _id: "1",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quidem.",
  rating: 3,
  likes: 322,
  dislikes: 2,
  project: {
    _id: "1",
    title: "Project",
  },
  reviewer: {
    _id: "1",
    username: "user",
    avatar: "",
    full_name: {
      surname: "surname",
      name: "name",
      patronymic: "patronymic",
    },
  },
  created_at: "2024-01-01T12:09:12.955+00:00",
  updated_at: "2024-01-01T12:09:12.955+00:00",
}

export const Default: Story = {
  args: {
    review: mockReview,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
