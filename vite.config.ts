import viteReact from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import type { PluginOption } from "vite"
import babelPlugin from "vite-plugin-babel"
import macrosPlugin from "vite-plugin-babel-macros"
import type { ViteUserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineConfig(({ mode }) => {
  const commonOptions = {
    build: {
      rollupOptions: {
        output: {
          importAttributesKey: "with",
        },
      },
    },
    define: {
      "import.meta.vitest": "undefined",
    },
    esbuild: {
      drop: ["console", "debugger"],
      treeShaking: true,
    },
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
              // {
              //   compilationMode: "infer",
              //   eslintSuppressionRules: [],
              // } as const satisfies Partial<PluginOptions>,
            ],
          ],
        },
      }),
      macrosPlugin(),
      babelPlugin({
        babelConfig: {
          plugins: [
            "babel-plugin-react-compiler",
            // {
            //   compilationMode: "infer",
            // } as const satisfies Partial<PluginOptions>,
          ],
        },
      }),
      visualizer(_outputOptions => ({
        brotliSize: true,
        gzipSize: true,
        open: process.env.NO_OPEN ? false : true,
        projectRoot: import.meta.dirname,
        template: "flamegraph" as const,
      })) as PluginOption,
    ],

    server: {
      open: true,
    },
  } as const satisfies ViteUserConfig

  const developmentConfig = {
    build: {
      ...commonOptions,
      cssMinify: false,
      minify: false,
    },
    define: {
      ...commonOptions.define,
      // "import.meta.env.PROD": "false",
    },
    esbuild: {
      ...commonOptions.esbuild,
      // pure: ["createLogger", "requireReduxLogger"],
      treeShaking: true,
    },
    plugins: [...commonOptions.plugins],
  } as const satisfies ViteUserConfig

  const productionConfig = {
    ...commonOptions,
    build: {
      ...commonOptions.build,
      emptyOutDir: true,
      minify: true,
    },

    esbuild: {
      ...commonOptions.esbuild,
      treeShaking: true,
    },

    plugins: [...commonOptions.plugins],
  } as const satisfies ViteUserConfig

  return mode === "production" ? productionConfig : developmentConfig
})

export default viteConfig
