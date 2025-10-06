import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const tsFileGlobs = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
const typeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map((config) =>
  config.files ? config : { ...config, files: tsFileGlobs }
)
const stylisticTypeCheckedConfigs = tseslint.configs.stylisticTypeChecked.map((config) =>
  config.files ? config : { ...config, files: tsFileGlobs }
)

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...typeCheckedConfigs,
  ...stylisticTypeCheckedConfigs,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.test.json', './tsconfig.node.json'],
        tsconfigRootDir: rootDir
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
      }
    }
  },
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: rootDir
      }
    },
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'off'
    }
  }
]
