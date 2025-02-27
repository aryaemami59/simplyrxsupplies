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

export default defineConfig(configEnv =>
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
        name: packageJson.name,
        root: import.meta.dirname,
        dir: path.join(import.meta.dirname, "src", "tests"),

        unstubGlobals: true,
        unstubEnvs: true,
        includeTaskLocation: true,

        typecheck: {
          enabled: true,
          tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
        },

        exclude: [...defaultExclude, "src/hooks/loggers", ".yalc"],
        globals: true,
        coverage: {
          exclude: [...coverageConfigDefaults.exclude, "src/hooks/loggers"],
        },
        environment: "jsdom",
        chaiConfig: {
          includeStack: true,
          truncateThreshold: 1000,
        },
        reporters: [["verbose"], ["hanging-process"]],
        watch: false,
        setupFiles: ["./src/tests/test-utils/setup.vitest.ts"],
      },
    }),
  ),
)
