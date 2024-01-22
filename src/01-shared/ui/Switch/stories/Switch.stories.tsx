import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "../ui/Switch"
import { Label } from "../../Label"

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
  },
}
