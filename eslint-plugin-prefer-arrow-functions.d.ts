declare module "eslint-plugin-prefer-arrow-functions" {
  import type { TSESLint } from "@typescript-eslint/utils"

  export declare const meta: {
    name: "eslint-plugin-prefer-arrow-functions"
    version: string
  }

  export declare const rules: Record<string, TSESLint.LooseRuleDefinition>

  export declare const configs: {
    all: Required<Pick<TSESLint.FlatConfig.Config, "plugins" | "rules">>
  }

  declare const _default: {
    meta: typeof meta
    rules: typeof rules
    configs: typeof configs
  }

  declare const plugin: typeof _default & {
    default: typeof _default
  }

  export default plugin
}
