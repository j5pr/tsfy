// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "tsup";

export default defineConfig({
  target: "es6",
  format: ["cjs", "esm"],
  minify: "terser",
  entry: [
    "src/collections/index.ts",
    "src/core/index.ts",
    "src/functions/index.ts",
    "src/random/index.ts",
    "src/types/index.ts",
  ],
  dts: true,
  sourcemap: true,
  esbuildOptions(options) {
    options.sourcesContent = false;
  },
});
