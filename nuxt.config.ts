// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/ui',
    'dayjs-nuxt'
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

  runtimeConfig: {
    kisKey: process.env.NUXT_KIS_KEY,
    kisSecret: process.env.NUXT_KIS_SECRET,
    batchToken: process.env.BATCHTOKEN
  },

  compatibilityDate: '2025-09-31',

  future: {
    compatibilityVersion: 4
  },

  dayjs: {
    locales: ['en', 'ko'],
    plugins: ['utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul'
  }
})