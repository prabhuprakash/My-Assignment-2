import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  reactPlugin.configs.flat["jsx-runtime"],
  eslintPluginPrettier,
  eslintConfigPrettier,
  {
    rules: {
      "react/prop-types": [0],
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-unused-vars": [1],
      "comma-dangle": ["error", "never"]
    }
  }
];
