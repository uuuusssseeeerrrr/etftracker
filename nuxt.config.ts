import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxt/ui'
  ],

  alias: {
    '#models': fileURLToPath(new URL('./models', import.meta.url)),
    '#server': fileURLToPath(new URL('./server', import.meta.url)),
    '#types': fileURLToPath(new URL('./types', import.meta.url)),
    '#lib': fileURLToPath(new URL('./lib', import.meta.url)),
    '#util': fileURLToPath(new URL('./server/utils', import.meta.url)),
  },

  imports: {
    dirs: ["types"],
  },

  css: [
    '@/assets/global.css',
  ],

  app: {
    head: {
      title: 'etfTracker',
      htmlAttrs: {
        lang: 'kr'
      },
      charset: 'utf-8',
    }
  },

  compatibilityDate: '2025-10-31',

  future: {
    compatibilityVersion: 4
  },

  routeRules: {
    '/': { ssr: true },  // index 페이지만 SSR
    '/**': { ssr: false }, // 나머지는 모두 CSR
  }
})