import stylistic from "@stylistic/eslint-plugin"
import globals from "globals"
import { defineConfig } from "eslint/config"
import js from "@eslint/js"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["dist/**"],
    plugins: { "@stylistic": stylistic },
    ...js.configs.recommended,
    languageOptions: { globals: globals.node, sourceType: "module" },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/semi": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
    },
  },
])
