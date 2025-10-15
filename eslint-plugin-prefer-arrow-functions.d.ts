declare module "eslint-plugin-prefer-arrow-functions" {
  import type { TSESLint } from "@typescript-eslint/utils"

  export const meta: {
    name: "eslint-plugin-prefer-arrow-functions"
    version: string
  }

  export const rules: Record<string, TSESLint.LooseRuleDefinition>

  export const configs: {
    all: Required<Pick<TSESLint.FlatConfig.Config, "plugins" | "rules">>
  }

  const _default: {
    configs: typeof configs
    meta: typeof meta
    rules: typeof rules
  }

  const plugin: typeof _default & {
    default: typeof _default
  }

  export default plugin
}
