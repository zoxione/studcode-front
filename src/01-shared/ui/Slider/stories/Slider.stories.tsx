import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "../ui/Slider"

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}
