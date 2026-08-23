import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, lazyPlugins } from "vite-plus";

const config = defineConfig(({ mode }) => {
  console.log("mode", mode);
  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: lazyPlugins(() => [
      nitro(),
      babel({
        presets: [reactCompilerPreset()],
        include: [/\.(ts|tsx|js|jsx)$/],
      }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ]),
  };
});

export default config;
