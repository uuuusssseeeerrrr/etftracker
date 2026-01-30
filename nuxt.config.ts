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