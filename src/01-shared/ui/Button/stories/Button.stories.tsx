import { ChevronRightIcon, EnvelopeOpenIcon, ReloadIcon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../ui/Button"


const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
}

export const Disable: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
}

export const Icon: Story = {
  args: {
    variant: "outline",
    size: "icon",
    children: (
      <>
        <ChevronRightIcon className="h-4 w-4" />
      </>
    ),
  },
}

export const WithIcon: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    variant: "default",
    disabled: true,
    children: (
      <>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    ),
  },
}

export const AsChild: Story = {
  args: {
    variant: "default",
    asChild: true,
    children: (
      <>
        <a href="/">Login</a>
      </>
    ),
  },
}
