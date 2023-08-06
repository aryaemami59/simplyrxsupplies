import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: { drop: ["console", "debugger"] },
  server: {
    open: true,
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
      template: "treemap",
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "analyze.html",
    }),
  ],
});
