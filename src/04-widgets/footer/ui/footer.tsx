import { ToggleTheme } from "@/03-features/toggle-theme"
import { Logo } from "@/04-widgets/logo"

interface IFooterProps {}

export const Footer = ({}: IFooterProps) => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto flex flex-col gap-2 my-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Logo />
          <ul className="flex flex-col md:flex-row md:items-center gap-4">
            <li>
              <a href="#" className="hover:underline">
                Пользовательское соглашение
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Конфиденциальность
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                О нас
              </a>
            </li>
            <ToggleTheme />
          </ul>
        </div>
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="hover:underline">
            Студенческий Код™.
          </a>{" "}
          Все права защищены.
        </span>
      </div>
    </footer>
  )
}
