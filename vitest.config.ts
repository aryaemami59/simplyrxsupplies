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
        hookTimeout: 20_000,
        exclude: [...defaultExclude, "src/hooks/loggers", ".yalc"],
        globals: true,
        coverage: {
          exclude: [...coverageConfigDefaults.exclude, "src/hooks/loggers"],
          reporter: ["text", "json", "html"],
          provider: "v8",
          enabled: true,
        },
        allowOnly: true,
        environment: "jsdom",
        ui: true,
        chaiConfig: {
          truncateThreshold: 1000,
          includeStack: true,
          showDiff: true,
        },
        reporters: ["html", "verbose", "hanging-process"],
        watch: true,
        css: true,
        benchmark: {
          reporters: ["default"],
        },
        setupFiles: ["src/tests/test-utils/setup.vitest.ts"],
      },
    }),
  ),
)
