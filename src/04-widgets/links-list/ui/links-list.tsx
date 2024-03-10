import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons"
import Link from "next/link"
import { ReactNode } from "react"

import { ILink } from "@/01-shared/types/link"
import { Badge } from "@/01-shared/ui/Badge"

interface LinksListProps {
  links: ILink[]
}

const LinksList = ({ links }: LinksListProps) => {
  const linksList: ReactNode[] = []

  links.forEach((link) => {
    switch (link.type) {
      case "github":
        linksList.push(
          <Badge key={link.type} variant="outline" asChild>
            <Link href={link.url} target="_blank">
              <GitHubLogoIcon className="mr-1 h-4 w-4" />
              {link.label}
            </Link>
          </Badge>,
        )
        break
      case "telegram":
        break
      default: {
        linksList.push(
          <Badge key={link.type} variant="outline" asChild>
            <Link href={link.url} target="_blank">
              <Link2Icon className="mr-1 h-4 w-4" />
              {link.label}
            </Link>
          </Badge>,
        )
        break
      }
    }
  })

  return <div className="flex flex-col sm:items-end gap-1">{linksList}</div>
}

export { LinksList }
