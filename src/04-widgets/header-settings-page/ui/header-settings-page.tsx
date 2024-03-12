import { ReactNode, forwardRef } from "react"

import { Separator } from "@/01-shared/ui/separator"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"

interface HeaderSettingsPageProps {
  title: string | ReactNode
  description?: string
  right?: ReactNode
  className?: string
}

const HeaderSettingsPage = forwardRef<HTMLDivElement, HeaderSettingsPageProps>(
  ({ title, description, right, className }, ref) => {
    return (
      <header className={cn("mb-6 ", className)} ref={ref}>
        <div className="flex flex-row justify-between items-center">
          <div className="space-y-0.5 py-6">
            <Title order={3}>{title}</Title>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {right}
        </div>
        <Separator />
      </header>
    )
  },
)
HeaderSettingsPage.displayName = "HeaderSettingsPage"

export { HeaderSettingsPage }
