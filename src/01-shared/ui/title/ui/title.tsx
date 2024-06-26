import { cva, type VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

import { cn } from "@/01-shared/utils/cn"

const titleVariants = cva([""], {
  variants: {
    order: {
      1: "text-4xl font-extrabold tracking-tight",
      2: "text-3xl font-semibold tracking-tight",
      3: "text-2xl font-semibold tracking-tight",
      4: "text-xl font-semibold tracking-tight",
      5: "text-lg font-semibold tracking-tight",
      6: "text-base font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    order: 2,
  },
})

interface TitleProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof titleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Title = ({ children, order = 1, as, className }: TitleProps) => {
  if (![1, 2, 3, 4, 5, 6, null].includes(order)) {
    return null
  }

  const Element = as || (`h${order}` as keyof JSX.IntrinsicElements)

  return <Element className={cn(titleVariants({ order, className }))}>{children}</Element>
}

export { Title }
