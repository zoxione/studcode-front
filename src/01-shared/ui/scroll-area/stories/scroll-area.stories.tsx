import type { Meta, StoryObj } from "@storybook/react"

import { ScrollArea, ScrollBar } from "../ui/scroll-area"

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

interface Artwork {
  artist: string
  art: string
}

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export const Default: Story = {
  args: {
    children: (
      <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <img
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                Photo by <span className="font-semibold text-foreground">{artwork.artist}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
  },
}
