import { cn } from "@/01-shared/utils/cn"
import styles from "./Title.module.scss"
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

const titleVariants = cva([""], {
  variants: {
    order: {
      1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
      2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      4: "scroll-m-20 text-xl font-semibold tracking-tight",
      5: "scroll-m-20 text-lg font-semibold tracking-tight",
      6: "scroll-m-20 text-base font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    order: 2,
  },
})

interface TitleProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof titleVariants> {}

const Title = ({ children, order = 1, className }: TitleProps) => {
  if (![1, 2, 3, 4, 5, 6, null].includes(order)) {
    return null
  }

  const Element = `h${order}` as keyof JSX.IntrinsicElements

  return <Element className={cn(titleVariants({ order, className }))}>{children}</Element>
}

export { Title }
