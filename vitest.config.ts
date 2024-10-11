import react from "@vitejs/plugin-react"
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config"
import viteConfig from "./vite.config"

export default defineConfig(configEnv =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      plugins: [
        react({
          babel: {
            plugins: [
              [
                "babel-plugin-transform-react-remove-prop-types",
                { removeImport: true },
              ],
              ["macros", { "fontawesome-svg-core": { license: "free" } }],
            ],
          },
        }),
      ],
      test: {
        unstubGlobals: true,
        includeTaskLocation: true,
        typecheck: { tsconfig: "tsconfig.json" },
        exclude: [...defaultExclude, "src/hooks/loggers", ".yalc"],
        globals: true,
        coverage: {
          exclude: [...coverageConfigDefaults.exclude, "src/hooks/loggers"],
        },
        environment: "jsdom",
        chaiConfig: {
          truncateThreshold: 1000,
          includeStack: true,
        },
        reporters: ["verbose", "hanging-process"],
        watch: false,
        setupFiles: ["src/tests/test-utils/setup.vitest.ts"],
      },
    }),
  ),
)
