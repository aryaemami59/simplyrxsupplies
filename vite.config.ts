import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";

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
    server: {
      open: true,
    },
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
    server: {
      open: true,
    },
  };
  return mode === "development" ? developmentConfig : productionConfig;
});
