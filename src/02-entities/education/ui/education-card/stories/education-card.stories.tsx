import type { Meta, StoryFn, StoryObj } from "@storybook/react"

import { TooltipProvider } from "@/01-shared/ui/tooltip"
import { Education } from "@/02-entities/education"
import { EducationCard } from "../ui/education-card"

const meta = {
  title: "Education/EducationCard",
  component: EducationCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EducationCard>

export default meta
type Story = StoryObj<typeof meta>

const mockEducation: Education = {
  _id: "1",
  abbreviation: "EDU",
  name: "Education",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  logo: "",
  created_at: "2024-01-01T12:09:12.955+00:00",
  updated_at: "2024-01-01T12:09:12.955+00:00",
}

export const Default: StoryFn = () => (
  <TooltipProvider>
    <EducationCard education={mockEducation} />
  </TooltipProvider>
)
