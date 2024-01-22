import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-styling"
import "@/07-core/styles/globals.css"
import customTheme from "./theme"
import "./storybook.css"

const preview: Preview = {
  parameters: {
    docs: {
      theme: customTheme,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
