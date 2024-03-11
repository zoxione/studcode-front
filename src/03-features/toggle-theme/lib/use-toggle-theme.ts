import { useTheme } from "next-themes"

interface useToggleThemeProps {}

const useToggleTheme = ({}: useToggleThemeProps) => {
  const { setTheme } = useTheme()

  return { setTheme }
}

export { useToggleTheme }
