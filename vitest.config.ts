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
              // [
              //   "babel-plugin-transform-react-remove-prop-types",
              //   { removeImport: true },
              // ],
              ["macros", { "fontawesome-svg-core": { license: "free" } }],
            ],
          },
        }),
      ],
      test: {
        // cache: false,
        exclude: [...defaultExclude, "src/hooks/loggers"],
        includeSource: ['src/**/*.ts(x)?'],
        // dir: "src/tests",
        mockReset: true,
        clearMocks: true,
        restoreMocks: true,
        // include: ["**/*.test.?(c|m)[jt]s?(x)"],
        globals: true,
        // browser: {
        //   name: "chrome",
        //   headless: false,
        //   enabled: true,
        //   slowHijackESM: true,
        // },
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
        reporters: ["html", "verbose"],
        watch: true,
        css: true,
        benchmark: {
          reporters: ["json"],
        },
        setupFiles: ["src/tests/test-utils/setup.vitest.ts"],
      },
    }),
  ),
)
