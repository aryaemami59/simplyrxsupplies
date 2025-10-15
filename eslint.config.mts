import js from "@eslint/js"
import type { TSESLint } from "@typescript-eslint/utils"
import vitestPlugin from "@vitest/eslint-plugin"
import type { Linter } from "eslint"
import prettierConfig from "eslint-config-prettier/flat"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import perfectionistPlugin from "eslint-plugin-perfectionist"
import preferArrowFunctionsPlugin from "eslint-plugin-prefer-arrow-functions"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import { configs } from "typescript-eslint"

export const rulesToDisable = {
  "@typescript-eslint/ban-ts-comment": [
    0,
    {
      minimumDescriptionLength: 3,
      "ts-check": false,
      "ts-expect-error": "allow-with-description",
      "ts-ignore": true,
      "ts-nocheck": true,
    },
  ],
  "no-undef": [
    0,
    {
      typeof: false,
    },
  ],
  "perfectionist/sort-imports": [0],
  "perfectionist/sort-modules": [0],
  "perfectionist/sort-named-imports": [0],
  "vitest/valid-describe-callback": [0],
} as const satisfies Linter.RulesRecord satisfies Record<
  keyof Linter.RulesRecord,
  readonly [
    ruleSeverity: Extract<Linter.RuleSeverity, 0 | "off">,
    ...ruleOptions: readonly unknown[],
  ]
>

const eslintConfig = defineConfig(
  {
    ignores: [
      "**/__snapshots__/",
      "**/.docusaurus/",
      "**/.expo/",
      "**/.next/",
      "**/.temp/",
      "**/.tmp/",
      "**/.yalc/",
      "**/.yarn/",
      "**/*.snap",
      "**/build/",
      "**/coverage/",
      "**/dist/",
      "**/html/",
      "**/temp/",
    ],
    name: "global-ignores",
  },

  {
    name: `${js.meta.name}/recommended`,
    ...js.configs.recommended,
  },

  ...configs.strictTypeChecked,
  ...configs.stylisticTypeChecked,

  // @ts-expect-error - types are wrong
  vitestPlugin.configs.recommended,

  {
    name: `${reactHooksPlugin.meta.name}/recommended-latest`,
    ...reactHooksPlugin.configs.flat["recommended-latest"],
  },
  {
    name: `${preferArrowFunctionsPlugin.meta.name}/all`,
    ...preferArrowFunctionsPlugin.configs.all,
  },
  {
    name: "react/recommended",
    ...reactPlugin.configs.flat.recommended,
  },
  {
    name: "react/jsx-runtime",
    ...reactPlugin.configs.flat["jsx-runtime"],
  },

  jsxA11yPlugin.flatConfigs.strict,

  {
    name: `${perfectionistPlugin.meta.name}/recommended-natural`,
    ...perfectionistPlugin.configs["recommended-natural"],
  },

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          defaultProject: "tsconfig.json",
        },
        tsconfigRootDir: import.meta.dirname,
      } as const satisfies TSESLint.FlatConfig.ParserOptions,
    } as const satisfies TSESLint.FlatConfig.LanguageOptions,
    linterOptions: {
      reportUnusedDisableDirectives: 2,
      reportUnusedInlineConfigs: 2,
    },

    name: "main",

    rules: {
      "@typescript-eslint/consistent-type-definitions": [2, "type"],
      "@typescript-eslint/consistent-type-exports": [
        2,
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        2,
        {
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/dot-notation": [2],
      "@typescript-eslint/no-confusing-void-expression": [2],
      "@typescript-eslint/no-duplicate-type-constituents": [2],
      "@typescript-eslint/no-empty-object-type": [
        2,
        {
          allowInterfaces: "never",
          allowObjectTypes: "never",
        },
      ],
      "@typescript-eslint/no-explicit-any": [
        2,
        {
          fixToUnknown: false,
          ignoreRestArgs: false,
        },
      ],
      "@typescript-eslint/no-inferrable-types": [2],
      "@typescript-eslint/no-invalid-void-type": [
        2,
        {
          allowAsThisParameter: false,
          allowInGenericTypeArguments: ["BoxedVoid"],
        },
      ],
      "@typescript-eslint/no-namespace": [
        2,
        {
          allowDeclarations: false,
          allowDefinitionFiles: true,
        },
      ],
      "@typescript-eslint/no-redundant-type-constituents": [2],
      "@typescript-eslint/no-restricted-types": [
        2,
        {
          types: {
            "{}": {
              message: `
- If you want to represent an empty object, use \`type EmptyObject = Record<string, never>\`.
- If you want to represent an object literal, use either \`type AnyObject = Record<string, any>\` or \`object\`.
- If you want to represent any non-nullish value, use \`type AnyNonNullishValue = NonNullable<unknown>\`.`,
              suggest: [
                "AnyNonNullishValue",
                "EmptyObject",
                "AnyObject",
                "object",
                "Record<string, never>",
                "Record<string, any>",
                "NonNullable<unknown>",
              ],
            },
          },
        },
      ],
      "@typescript-eslint/no-unnecessary-type-arguments": [2],
      "@typescript-eslint/no-unnecessary-type-assertion": [2],
      "@typescript-eslint/no-unnecessary-type-parameters": [2],
      "@typescript-eslint/no-unused-vars": [
        2,
        {
          args: "after-used",
          // Not included in default options
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          // Not included in default options
          caughtErrorsIgnorePattern: "^_",
          // Not included in default options
          destructuredArrayIgnorePattern: "^_",
          ignoreClassWithStaticInitBlock: false,
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false,
          vars: "all",
          // Not included in default options
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": [2],
      "@typescript-eslint/require-await": [2],
      "@typescript-eslint/unified-signatures": [2],
      "object-shorthand": [2],
      "perfectionist/sort-array-includes": [2],
      "perfectionist/sort-interfaces": [2],
      "perfectionist/sort-intersection-types": [2],
      "perfectionist/sort-object-types": [2],
      "perfectionist/sort-objects": [
        2,
        {
          fallbackSort: {
            order: "asc",
            type: "alphabetical",
          },
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-sets": [2],
      "perfectionist/sort-switch-case": [2],
      "perfectionist/sort-union-types": [2],
      "prefer-arrow-functions/prefer-arrow-functions": [
        2,
        {
          allowedNames: [] as const satisfies readonly string[],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: "unchanged",
          singleReturnOnly: false,
        },
      ],
      "sort-imports": [
        2,
        {
          allowSeparatedGroups: false,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      ...rulesToDisable,
    },

    settings: {
      react: {
        version: "detect",
      },
      vitest: {
        typecheck: true,
      },
    },
  },

  {
    files: ["**/*.c[jt]s"],
    languageOptions: {
      sourceType: "commonjs" as const satisfies TSESLint.FlatConfig.SourceType,
    } as const satisfies TSESLint.FlatConfig.LanguageOptions,
    name: "commonjs-files",
    rules: {
      "@typescript-eslint/no-require-imports": [
        0,
        [
          {
            allow: [] as const satisfies readonly string[],
            allowAsImport: false,
          },
        ],
      ],
    },
  },

  {
    files: ["**/*.d.?(c|m)ts"],
    name: "typescript-declaration-files",
    rules: {
      "@typescript-eslint/consistent-type-definitions": [0, "type"],
      "@typescript-eslint/no-empty-object-type": [
        2,
        {
          allowInterfaces: "with-single-extends",
          allowObjectTypes: "never",
        },
      ],
    },
  },

  prettierConfig,
)

export default eslintConfig
