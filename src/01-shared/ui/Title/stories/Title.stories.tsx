import type { Meta, StoryObj } from "@storybook/react"

import { Title } from "../ui/Title"


const meta = {
  title: "UI/Title",
  component: Title,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter your message here",
  },
}

export const H1: Story = {
  args: {
    order: 1,
    children: "Title 1",
  },
}

export const H2: Story = {
  args: {
    order: 2,
    children: "Title 2",
  },
}

export const H3: Story = {
  args: {
    order: 3,
    children: "Title 3",
  },
}

export const H4: Story = {
  args: {
    order: 4,
    children: "Title 4",
  },
}

export const H5: Story = {
  args: {
    order: 5,
    children: "Title 5",
  },
}

export const H6: Story = {
  args: {
    order: 6,
    children: "Title 6",
  },
}
