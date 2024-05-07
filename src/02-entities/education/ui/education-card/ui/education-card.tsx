import Image from "next/image"
import { HTMLAttributes, forwardRef } from "react"
import { University } from "lucide-react"

import { Title } from "@/01-shared/ui/title"
import { Education } from "../../../model/types"

export interface EducationCardProps extends HTMLAttributes<HTMLAnchorElement> {
  education: Education
}

const EducationCard = forwardRef<HTMLAnchorElement, EducationCardProps>(({ education, className }, ref) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden">
        {education.logo !== "" ? (
          <Image src={education.logo} alt={education.name} fill className="object-cover" />
        ) : (
          <University className="w-20 h-20" />
        )}
      </div>
      <div className="">
        <Title order={6} as="h6">
          {education.abbreviation}
        </Title>
        <div className="text-sm text-muted-foreground">{education.name}.</div>
      </div>
    </div>
  )
})
EducationCard.displayName = "EducationCard"

export { EducationCard }
