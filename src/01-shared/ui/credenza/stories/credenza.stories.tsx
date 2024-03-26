import type { Meta, StoryObj } from "@storybook/react"

import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "../ui/credenza"

const meta = {
  title: "UI/Credenza",
  component: Credenza,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Credenza>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <CredenzaTrigger asChild>
          <button>Open modal</button>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Credenza</CredenzaTitle>
            <CredenzaDescription>A responsive modal component for shadcn/ui.</CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            This component is built using shadcn/ui&apos;s dialog and drawer component, which is built on top of Vaul.
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <button>Close</button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </>
    ),
  },
}
