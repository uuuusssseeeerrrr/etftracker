import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    root: '.',
    test: {
        clearMocks: true,
        globals: true,
        setupFiles: ['dotenv/config'],
    },
});
