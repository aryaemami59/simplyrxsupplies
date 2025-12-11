declare module "eslint-plugin-prefer-arrow-functions" {
  import type { Linter, Rule } from "eslint"

  export const meta: {
    name: "eslint-plugin-prefer-arrow-functions"
    version: string
  }

  export const rules: Record<string, Rule.RuleModule>
  // export const rules: Record<
  //   "prefer-arrow-functions",
  //   TSESLint.RuleModule<
  //     | "USE_ARROW_WHEN_FUNCTION"
  //     | "USE_ARROW_WHEN_SINGLE_RETURN"
  //     | "USE_EXPLICIT"
  //     | "USE_IMPLICIT",
  //     [
  //       {
  //         allowedNames: string[]
  //         allowNamedFunctions: "only-expressions" | boolean
  //         allowObjectProperties: boolean
  //         classPropertiesAllowed: boolean
  //         disallowPrototype: boolean
  //         returnStyle: "always" | "never" | "unchanged"
  //         singleReturnOnly: boolean
  //       },
  //     ]
  //   >
  // >

  export const configs: {
    all: {
      plugins: Record<
        string,
        {
          meta: typeof meta
          rules: typeof rules
        }
      >
      rules: {
        "prefer-arrow-functions/prefer-arrow-functions": Extract<
          Linter.StringSeverity,
          "warn"
        >
      }
    }
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
