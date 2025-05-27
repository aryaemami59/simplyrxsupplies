import viteReact from "@vitejs/plugin-react"
import * as path from "node:path"
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
  mergeConfig,
} from "vitest/config"
import packageJson from "./package.json" with { type: "json" }
import viteConfig from "./vite.config.js"

const vitestConfig = defineConfig(configEnv =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      plugins: [
        viteReact({
          babel: {
            plugins: [
              [
                "babel-plugin-transform-react-remove-prop-types",
                { removeImport: true },
              ],
              [
                "macros",
                {
                  "fontawesome-svg-core": {
                    license: "free",
                  },
                },
              ],
            ],
          },
        }),
      ],

      test: {
        chaiConfig: {
          includeStack: true,
          truncateThreshold: 1000,
        },

        coverage: {
          exclude: [...coverageConfigDefaults.exclude, "src/hooks/loggers"],
        },

        dir: path.join(import.meta.dirname, "src", "tests"),
        environment: "jsdom",
        exclude: [...defaultExclude, "src/hooks/loggers", ".yalc"],
        globals: true,
        includeTaskLocation: true,
        name: packageJson.name,
        reporters: [["verbose"], ["hanging-process"]],
        root: import.meta.dirname,
        setupFiles: ["./src/tests/test-utils/setup.vitest.ts"],
        testTimeout: 10_000,

        typecheck: {
          enabled: true,
          tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
        },

        unstubEnvs: true,
        unstubGlobals: true,
        watch: false,
      },
    }),
  ),
)

export default vitestConfig
