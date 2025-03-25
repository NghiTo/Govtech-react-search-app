import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        ...configDefaults.exclude,
        "src/main.tsx",
        "src/types/*",
        "src/vite-env.d.ts",
        "src/config/axiosInstance.ts",
      ],
    },
  },
});
