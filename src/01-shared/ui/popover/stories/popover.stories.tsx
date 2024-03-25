import type { Meta, StoryObj } from "@storybook/react"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const meta = {
  title: "UI/Popover",
  component: Popover,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </>
    ),
  },
}
