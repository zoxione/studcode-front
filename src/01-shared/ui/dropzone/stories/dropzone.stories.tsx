import type { Meta, StoryObj } from "@storybook/react"
import { ImageIcon } from "@radix-ui/react-icons"

import { Dropzone } from "../ui/dropzone"

const meta = {
  title: "UI/Dropzone",
  component: Dropzone,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: null,
  },
}

export const Single: Story = {
  args: {
    value: null,
    classNameWrapper: "w-24 h-24 rounded-full overflow-hidden",
    preview: true,
    classNamePreview: "size-full aspect-square",
    dropContent: (
      <>
        <ImageIcon className="h-6 w-6" />
      </>
    ),
  },
}

export const Multiple: Story = {
  args: {
    value: null,
    classNameWrapper: "",
    multiple: true,
    preview: true,
    dropContent: (
      <>
        <div className="flex flex-row items-center gap-4 py-12">
          <ImageIcon className="h-8 w-8" />
          <div className="flex flex-col">
            <span className="font-medium text-sm">Перетащите изображения сюда или нажмите, чтобы выбрать файлы</span>
            <span className="">Рекомендуется разрешение 1270x760px или выше, размер не должен превышать 5 МБ.</span>
          </div>
        </div>
      </>
    ),
  },
}
