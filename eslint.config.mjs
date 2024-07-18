import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "eslint-plugin-vitest";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    ignores: ["dist/", ".astro/"],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  ...eslintPluginAstro.configs["flat/recommended"], // In CommonJS, the `flat/` prefix is required.
  eslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: fixupPluginRules({ rules: react.rules }),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    files: ["src/components/**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      vitest,
      "testing-library": fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      ...vitest.configs.recommended.rules,
    },
  },
);
