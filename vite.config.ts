import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import macrosPlugin from "vite-plugin-babel-macros";
import type { UserConfig } from "vitest/config";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const testConfig: UserConfig = {
    define: { global: "window" },
    plugins: [
      react({
        // babel: {
        //   plugins: [
        //     ["macros", { "fontawesome-svg-core": { license: "free" } }],
        //   ],
        // },
      }),
    ],
    test: {
      // browser: {
      //   name: "chrome",
      //   enabled: true,
      // },
      coverage: {
        reporter: ["text", "json", "html"],
        provider: "v8",
        enabled: true,
        clean: true,
        cleanOnRerun: true,
        reportsDirectory: "./",
      },
      environment: "jsdom",
      ui: true,
      reporters: ["html", "verbose"],
      // watch: true,
      // environmentOptions: {happyDOM: {}},
      // globals: true,
      css: true,
      setupFiles: ["./setup-vitest.ts"],
    },
  };
  if (mode === "test") {
    return testConfig;
  }
  const developmentConfig: UserConfig = {
    plugins: [
      react({
        // babel: {
        //   plugins: [
        //     ["macros", { "fontawesome-svg-core": { license: "free" } }],
        //   ],
        // },
      }),
      macrosPlugin(),
    ],
    server: { open: true },
  };

  const productionConfig: UserConfig = {
    esbuild: { drop: ["console", "debugger"] },
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
        template: "treemap",
      }),
    ],
    server: { open: true },
  };
  return mode === "production" ? productionConfig : developmentConfig;
});
