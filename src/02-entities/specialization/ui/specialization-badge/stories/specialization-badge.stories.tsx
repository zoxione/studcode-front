import type { Meta, StoryFn, StoryObj } from "@storybook/react"

import { TooltipProvider } from "@/01-shared/ui/tooltip"
import { Specialization } from "@/02-entities/specialization"
import { SpecializationBadge } from "../ui/specialization-badge"

const meta = {
  title: "Specialization/SpecializationBadge",
  component: SpecializationBadge,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SpecializationBadge>

export default meta
type Story = StoryObj<typeof meta>

const mockSpecialization: Specialization = {
  _id: "1",
  name: "Specialization",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  created_at: "2024-01-01T12:09:12.955+00:00",
  updated_at: "2024-01-01T12:09:12.955+00:00",
}

export const Default: StoryFn = () => (
  <TooltipProvider>
    <SpecializationBadge specialization={mockSpecialization} />
  </TooltipProvider>
)
