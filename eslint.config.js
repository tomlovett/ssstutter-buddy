import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { ignores: ['**/public/'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
  },
  {
    rules: {
      'no-unused-vars': [
        // Not working
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]
