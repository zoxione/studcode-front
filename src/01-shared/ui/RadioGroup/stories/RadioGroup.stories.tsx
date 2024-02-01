import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"
import { Label } from "../../Label"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    ),
  },
}
