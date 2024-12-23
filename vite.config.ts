import viteReact from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import macrosPlugin from "vite-plugin-babel-macros"
import type { ViteUserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const developmentConfig: ViteUserConfig = {
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
          ],
        },
      }) as ViteUserConfig["plugins"],
      macrosPlugin(),
    ],

    server: {
      open: true,
    },
  }

  const productionConfig: ViteUserConfig = {
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
      }) as ViteUserConfig["plugins"],
      macrosPlugin(),
      visualizer({
        brotliSize: true,
        filename: "analyze.html",
        gzipSize: true,
        open: true,
        template: "flamegraph",
      }) as NonNullable<ViteUserConfig["plugins"]>[number],
    ],

    server: {
      open: true,
    },
  }
  return mode === "production" ? productionConfig : developmentConfig
})
