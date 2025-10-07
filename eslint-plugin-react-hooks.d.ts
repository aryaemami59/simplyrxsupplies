declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint"
  import type * as estree from "estree"

  declare const plugin: {
    meta: {
      name: "eslint-plugin-react-hooks"
    }
    rules: {
      "exhaustive-deps": {
        meta: {
          type: "suggestion"
          docs: {
            description: string
            recommended: true
            url: string
          }
          fixable: "code"
          hasSuggestions: true
          schema: {
            type: "object"
            additionalProperties: false
            enableDangerousAutofixThisMayCauseInfiniteLoops: boolean
            properties: {
              additionalHooks: {
                type: "string"
              }
              enableDangerousAutofixThisMayCauseInfiniteLoops: {
                type: "boolean"
              }
              experimental_autoDependenciesHooks: {
                type: "array"
                items: {
                  type: "string"
                }
              }
              requireExplicitEffectDeps: {
                type: "boolean"
              }
            }
          }[]
        }
        create(context: Rule.RuleContext): {
          CallExpression: (node: estree.CallExpression) => void
        }
      }
      "rules-of-hooks": {
        meta: {
          type: "problem"
          docs: {
            description: string
            recommended: true
            url: string
          }
          schema: {
            type: "object"
            additionalProperties: false
            properties: {
              additionalHooks: {
                type: "string"
              }
            }
          }[]
        }
        create(context: Rule.RuleContext): {
          "*"(node: unknown): void
          "*:exit"(node: unknown): void
          CallExpression(
            node: estree.CallExpression & Rule.NodeParentExtension,
          ): void
          Identifier(node: estree.Identifier & Rule.NodeParentExtension): void
          "CallExpression:exit"(
            node: estree.CallExpression & Rule.NodeParentExtension,
          ): void
          FunctionDeclaration(
            node: estree.FunctionDeclaration & Rule.NodeParentExtension,
          ): void
          ArrowFunctionExpression(
            node: estree.ArrowFunctionExpression & Rule.NodeParentExtension,
          ): void
        }
      }
    }
    configs: {
      "recommended-legacy": {
        plugins: string[]
        rules: Linter.RulesRecord
      }
      "recommended-latest-legacy": {
        plugins: string[]
        rules: Linter.RulesRecord
      }
      "flat/recommended": Linter.Config[]
      "recommended-latest": Linter.Config[]
      recommended: Linter.Config[]
    }
  }

  export { plugin as default }
}
