import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import { config, configs, parser, plugin } from "typescript-eslint"

const ESLintConfig = config(
  // `ignores` must be first.
  // config with just `ignores` is the replacement for `.eslintignore`
  { name: "ignores", ignores: ["**/dist/", "html"] },
  { name: "javascript", ...js.configs.recommended },
  ...configs.recommended,
  ...configs.stylistic,
  { name: "prettier-config", ...prettierConfig },
  {
    name: "main",
    languageOptions: {
      parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["./*.?(m|c)[tj]s?(x)", "prettier.config.mjs"],
          defaultProject: "./tsconfig.json",
        },
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
      },
    },
    rules: {
      "prefer-const": [2],
      "no-undef": [0],
      "@typescript-eslint/consistent-type-imports": [
        2,
        { fixStyle: "separate-type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/consistent-type-exports": [2],
      "@typescript-eslint/no-unused-vars": [0],
      "@typescript-eslint/array-type": [2, { default: "array-simple" }],
      "@typescript-eslint/no-explicit-any": [0],
      "@typescript-eslint/no-empty-interface": [
        2,
        { allowSingleExtends: true },
      ],
      "@typescript-eslint/no-unsafe-argument": [0],
      "@typescript-eslint/no-restricted-types": [2],
      "@typescript-eslint/no-empty-object-type": [2],
      "@typescript-eslint/no-unsafe-function-type": [2],
      "@typescript-eslint/no-wrapper-object-types": [2],
      "@typescript-eslint/no-namespace": [
        2,
        { allowDeclarations: true, allowDefinitionFiles: true },
      ],
      "@typescript-eslint/ban-ts-comment": [0],
      "@typescript-eslint/consistent-type-definitions": [2, "type"],
      "sort-imports": [
        2,
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
    },
    plugins: { "@typescript-eslint": plugin },
    linterOptions: { reportUnusedDisableDirectives: 2 },
  },
  {
    name: "commonjs",
    files: ["**/*.c[jt]s"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      "@typescript-eslint/no-var-requires": [0],
      "@typescript-eslint/no-require-imports": [0],
    },
  },
  {
    name: "typescript-declaration-files",
    files: ["**/*.d.?(c|m)ts"],
    rules: { "@typescript-eslint/no-empty-object-type": [0] },
  },
)

export default ESLintConfig
