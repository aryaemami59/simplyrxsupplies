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
    define: {
      "import.meta.vitest": "undefined",
    },
    plugins: [
      viteReact({
        // babel: {
        //   plugins: [
        //     [
        //       "macros",
        //       {
        //         "fontawesome-svg-core": {
        //           license: "free",
        //         },
        //       },
        //     ],
        //     [
        //       "babel-plugin-react-compiler",
        //       // {
        //       //   compilationMode: "infer",
        //       //   eslintSuppressionRules: [],
        //       // } as const satisfies Partial<PluginOptions>,
        //     ],
        //   ],
        // },
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
    ...commonOptions,
    build: {
      // ...commonOptions,
      cssMinify: false,
      minify: false,
    },
    define: {
      ...commonOptions.define,
      // "import.meta.env.PROD": "false",
    },
    plugins: [...commonOptions.plugins],
  } as const satisfies ViteUserConfig

  const productionConfig = {
    ...commonOptions,
    build: {
      cssMinify: true,
      emptyOutDir: true,
      minify: true,
      // rolldownOptions: {
      //   output: {
      //     codeSplitting: {},
      //   },
      // },
    },
    // define: {
    //   ...commonOptions.define,
    // },

    plugins: [...commonOptions.plugins],
  } as const satisfies ViteUserConfig

  return mode === "production" ? productionConfig : developmentConfig
})

export default viteConfig
