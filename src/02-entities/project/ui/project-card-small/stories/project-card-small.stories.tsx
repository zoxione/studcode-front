import type { Meta, StoryObj } from "@storybook/react"

import { ProjectCardSmall } from "../ui/project-card-small"
import { Project } from "@/02-entities/project"

const meta = {
  title: "Project/ProjectCardSmall",
  component: ProjectCardSmall,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProjectCardSmall>

export default meta
type Story = StoryObj<typeof meta>

const mockProject: Project = {
  _id: "1",
  title: "Bisky",
  tagline: "большая база лучших аниме с русской озвучкой в хорошем качестве.",
  status: "published",
  type: "web",
  description: "Большая база лучших аниме с русской озвучкой в хорошем качестве.",
  flames: 0,
  links: [{ label: "Main", type: "main", url: "https://bisky.one" }],
  logo: "https://raw.githubusercontent.com/AmyGrooove/bisky-front/main/public/favicons/favicon-128x128.png",
  screenshots: [],
  price: "free",
  rating: 0,
  slug: "bisky",
  creator: {
    _id: "1",
    username: "user",
    avatar: "",
    full_name: {
      surname: "surname",
      name: "name",
      patronymic: "patronymic",
    },
  },
  team: {
    _id: "1",
    logo: "",
    name: "team",
    slug: "team",
  },
  tags: [],
  created_at: "2024-01-01T12:09:12.955+00:00",
  updated_at: "2024-01-01T12:09:12.955+00:00",
  voted: false,
}

export const Default: Story = {
  args: {
    project: mockProject,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
