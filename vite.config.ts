import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import type { PluginOption } from "vite"
import macrosPlugin from "vite-plugin-babel-macros"
import type { UserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const developmentConfig: UserConfig = {
    plugins: [
      react({
        babel: {
          plugins: [
            ["macros", { "fontawesome-svg-core": { license: "free" } }],
          ],
        },
      }),
      macrosPlugin(),
    ],
    server: { open: true },
  }

  const productionConfig: UserConfig = {
    esbuild: {
      drop: ["console", "debugger"],
      treeShaking: true,
    },
    build: { emptyOutDir: true, minify: true },
    define: {
      "import.meta.vitest": "undefined",
    },
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
      macrosPlugin(),
      visualizer({
        brotliSize: true,
        filename: "analyze.html",
        gzipSize: true,
        open: true,
        template: "flamegraph",
      }) as PluginOption,
    ],
    server: { open: true },
  }
  return mode === "production" ? productionConfig : developmentConfig
})
