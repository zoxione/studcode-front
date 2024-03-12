import { DiscordLogoIcon, GitHubLogoIcon, Link2Icon, StarIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HTMLAttributes, ReactNode, forwardRef } from "react"
import { GitlabIcon, YoutubeIcon } from "lucide-react"

import { ILink } from "@/01-shared/types/link"
import { badgeVariants } from "@/01-shared/ui/badge"
import { cn } from "@/01-shared/utils/cn"

export interface LinksListProps extends HTMLAttributes<HTMLDivElement> {
  links: ILink[]
}

const LinksList = forwardRef<HTMLDivElement, LinksListProps>(({ className, links, ...props }, ref) => {
  const linksList: ReactNode[] = []

  links.forEach((link) => {
    switch (link.type) {
      case "main":
        linksList.push(
          <Link
            key={link.type}
            href={link.url}
            target="_blank"
            className={cn(badgeVariants({ variant: "outline" }), "")}
          >
            <StarIcon className="mr-1 h-4 w-4" />
            {link.label}
          </Link>,
        )
        break
      case "github":
        linksList.push(
          <Link
            key={link.type}
            href={link.url}
            target="_blank"
            className={cn(badgeVariants({ variant: "outline" }), "")}
          >
            <GitHubLogoIcon className="mr-1 h-4 w-4" />
            {link.label}
          </Link>,
        )
        break
      case "gitlab":
        linksList.push(
          <Link
            key={link.type}
            href={link.url}
            target="_blank"
            className={cn(badgeVariants({ variant: "outline" }), "")}
          >
            <GitlabIcon className="mr-1 h-4 w-4" />
            {link.label}
          </Link>,
        )
        break
      case "discord":
        linksList.push(
          <Link
            key={link.type}
            href={link.url}
            target="_blank"
            className={cn(badgeVariants({ variant: "outline" }), "")}
          >
            <DiscordLogoIcon className="mr-1 h-4 w-4" />
            {link.label}
          </Link>,
        )
        break
      case "youtube":
        linksList.push(
          <Link
            key={link.type}
            href={link.url}
            target="_blank"
            className={cn(badgeVariants({ variant: "outline" }), "")}
          >
            <YoutubeIcon className="mr-1 h-4 w-4" />
            {link.label}
          </Link>,
        )
        break
      default: {
        linksList.push(
          <Link
            key={link.type}
            href={link.url}
            target="_blank"
            className={cn(badgeVariants({ variant: "outline" }), "")}
          >
            <Link2Icon className="mr-1 h-4 w-4" />
            {link.label}
          </Link>,
        )
        break
      }
    }
  })

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-1", className)} {...props}>
      {linksList}
    </div>
  )
})
LinksList.displayName = "LinksList"

export { LinksList }
