import viteReact from "@vitejs/plugin-react"
import type { PluginOptions } from "babel-plugin-react-compiler"
import { visualizer } from "rollup-plugin-visualizer"
import babelPlugin from "vite-plugin-babel"
import macrosPlugin from "vite-plugin-babel-macros"
import type { ViteUserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig(({ mode }) => {
  const developmentConfig = {
    plugins: [
      viteReact({
        babel: {
          plugins: [
            [
              "macros",
              {
                "fontawesome-svg-core": {
                  license: "free",
                },
              },
            ],
            [
              "babel-plugin-react-compiler",
              {} as const satisfies Partial<PluginOptions>,
            ],
          ],
        },
      }),
      macrosPlugin(),
      babelPlugin({
        babelConfig: {
          plugins: [
            "babel-plugin-react-compiler",
            {} as const satisfies Partial<PluginOptions>,
          ],
        },
      }),
    ],

    server: {
      open: true,
    },
  } as const satisfies ViteUserConfig

  const productionConfig = {
    esbuild: {
      drop: ["console", "debugger"],
      treeShaking: true,
    },

    build: {
      emptyOutDir: true,
      minify: true,
    },

    define: {
      "import.meta.vitest": "undefined",
    },

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
      macrosPlugin(),
      babelPlugin({
        babelConfig: {
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
            [
              "babel-plugin-react-compiler",
              {} as const satisfies Partial<PluginOptions>,
            ],
          ],
        },
      }),
      visualizer(_outputOptions => ({
        brotliSize: true,
        projectRoot: import.meta.dirname,
        gzipSize: true,
        open: process.env.NO_OPEN ? false : true,
        template: "flamegraph" as const,
      })),
    ],

    server: {
      open: true,
    },
  } as const satisfies ViteUserConfig

  return mode === "production" ? productionConfig : developmentConfig
})

export default viteConfig
