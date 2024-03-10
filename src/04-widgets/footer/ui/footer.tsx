import Link from "next/link"

import { footerLinks } from "@/01-shared/lib"
import { ToggleTheme } from "@/03-features/toggle-theme"
import { Logo } from "@/04-widgets/logo"

interface IFooterProps {}

export const Footer = ({}: IFooterProps) => {
  return (
    <footer className="bg-foreground dark:bg-accent text-background rounded-t-xl">
      <div className="container mx-auto flex flex-col gap-4 md:gap-2 my-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Logo className="dark:text-foreground" />
          <ul className="flex flex-col md:flex-row md:items-center gap-4">
            {footerLinks.map((link) => (
              <li
                key={link.id}
                className="hover:text-background/60 dark:text-foreground dark:hover:text-foreground/60 text-sm"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <ToggleTheme className="dark:text-foreground" />
          </ul>
        </div>
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} <Link href="/">Студенческий Код™.</Link>
          {"  "}
          Все права защищены.
        </span>
      </div>
    </footer>
  )
}
