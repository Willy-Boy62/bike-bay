import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
export default [js.configs.recommended,...tseslint.configs.recommended,{files:["**/*.{ts,tsx}"],languageOptions:{globals:{...globals.browser,...globals.node}},plugins:{react:reactPlugin,"react-hooks":hooks},settings:{react:{version:"detect"}},rules:{...hooks.configs.recommended.rules}}];
