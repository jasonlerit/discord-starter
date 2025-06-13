import eslint from "@eslint/js"
import n from "eslint-plugin-n"
import perfectionist from "eslint-plugin-perfectionist"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.mjs"],
    plugins: {
      n,
      perfectionist,
    },
    rules: {
      "no-console": "error",
      "n/no-process-env": "error",
      "perfectionist/sort-imports": "error",
    },
  },
  {
    ignores: ["dist"],
  },
])
