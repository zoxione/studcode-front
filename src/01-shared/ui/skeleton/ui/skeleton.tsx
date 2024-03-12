import { cn } from "@/01-shared/utils/cn"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-foreground/10", className)} {...props} />
}

export { Skeleton }
