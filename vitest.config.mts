import { loadEnv } from 'vite'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    root: '.',
    test: {
        clearMocks: true,
        environment: 'nuxt',
        setupFiles: ['dotenv/config']
    },
});
