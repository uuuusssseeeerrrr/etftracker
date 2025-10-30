const isProduction = process.env.NODE_ENV === 'production';

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

  build: {
    transpile: ['@prisma/client'] 
  },
})