import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import { readFileSync } from 'node:fs'

// 读取自动导入的全局变量
let autoImportGlobals = {}
try {
  autoImportGlobals = JSON.parse(
    readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8')
  )
} catch (error) {
  console.error(error)
  // 如果文件不存在，使用空对象
  autoImportGlobals = { globals: {} }
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
