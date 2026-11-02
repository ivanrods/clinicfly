import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  // Arquivos que o ESLint deve ignorar
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.vite/**',
    ],
  },

  // Regras recomendadas de JavaScript
  js.configs.recommended,

  // Regras recomendadas de TypeScript
  ...tseslint.configs.recommended,

  // Configurações compartilhadas
  {
    files: ['apps/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },

  // API - Node.js
  {
    files: ['apps/api/**/*.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // WEB - React
  {
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Evita conflito entre regras JS e TypeScript
  {
    files: ['apps/**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // Prettier sempre por último
  prettier,
];
