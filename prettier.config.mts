import type { Config } from "prettier"

const prettierConfig = {
  arrowParens: "avoid",
  semi: false,
} as const satisfies Config

export default prettierConfig
