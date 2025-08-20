import { defineConfig } from 'eslint/config'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
    {
        // 基础配置
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    semi: false,
                    singleQuote: true
                }
            ],
            // 其他 ESLint 规则
            'no-console': 'warn'
        }
    }
])
