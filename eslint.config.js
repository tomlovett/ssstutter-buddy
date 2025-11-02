import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/vendor/**',
      '**/public/**',
      '**/tmp/**',
      '**/log/**',
      '**/storage/**',
      '**/coverage/**',
      '**/test-results/**',
    ],
  },
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': ['error', { typeof: true }],
    },
  },
  {
    files: ['**/__tests__/**/*.{js,jsx}', '**/__mocks__/**/*.{js,jsx}', '**/jest.setup.cjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        process: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['vite.config.js', 'playwright.config.js', 'e2e/utils/letter-opener.js', '**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
]
