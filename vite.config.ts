import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import type { PluginOption } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import type { UserConfig } from "vitest/config";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const testConfig: UserConfig = {
    plugins: [
      react({
        babel: {
          plugins: [
            ["macros", { "fontawesome-svg-core": { license: "free" } }],
          ],
        },
      }),
    ],
    test: {
      exclude: [
        "node_modules",
        "dist",
        ".idea",
        ".git",
        ".cache",
        "src/hooks/loggers",
      ],
      include: ["**/*.test.?(c|m)[jt]s?(x)"],
      coverage: {
        exclude: ["src/hooks/loggers"],
        reporter: ["text", "json", "html"],
        provider: "v8",
        enabled: true,
      },
      allowOnly: true,
      environment: "jsdom",
      ui: true,
      useAtomics: true,
      chaiConfig: {
        truncateThreshold: 1000,
        includeStack: true,
        showDiff: true,
      },
      deps: {
        moduleDirectories: ["node_modules"],
      },
      reporters: ["html", "verbose"],
      watch: true,
      css: true,
      benchmark: {
        include: ["**/*.spec.?(c|m)[jt]s?(x)"],
        reporters: ["default"],
      },
      setupFiles: ["src/tests/test-utils/setup.vitest.ts"],
    },
  };
  if (mode === "test") {
    return testConfig;
  }
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
  };

  const productionConfig: UserConfig = {
    esbuild: {
      drop: ["console", "debugger"],
    },
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
        template: "treemap",
      }) as PluginOption,
    ],
    server: { open: true },
  };
  return mode === "development" ? developmentConfig : productionConfig;
});
