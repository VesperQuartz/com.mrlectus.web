import { defineConfig } from "vite-plus/pack";

export default defineConfig({
  entry: ["src/**"],
  exports: true,
  css: {
    fileName: "globals.css",
  },
  dts: true,
});
