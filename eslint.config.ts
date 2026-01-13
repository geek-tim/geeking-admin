import { globalIgnores } from 'eslint/config'
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginCypress from 'eslint-plugin-cypress'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
import { configureVueProject } from '@vue/eslint-config-typescript'
configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{vue,ts,mts,tsx}'],
    },
    globalIgnores([
        '**/dist/**',
        '**/dist-ssr/**',
        '**/coverage/**',
        '**/tests/**',
        '**/cypress/**',
    ]),

    ...pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        ...pluginCypress.configs.recommended,
        files: [
            'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
            'cypress/support/**/*.{js,ts,jsx,tsx}',
        ],
    },

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
    },

    skipFormatting,
    {
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'vue/no-unused-vars': 'off',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off', // TODO
            '@typescript-eslint/no-unused-expressions': 'off', // TODO
            '@typescript-eslint/triple-slash-reference': 'off', // TODO
            '@typescript-eslint/no-empty-object-type': 'off', // TODO
            'vue/no-reserved-component-names': 'off', // TODO
        },
    },
)
