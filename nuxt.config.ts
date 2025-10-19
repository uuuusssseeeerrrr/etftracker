const isProduction = process.env.NODE_ENV === 'production';

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

  compatibilityDate: '2025-09-31',

  future: {
    compatibilityVersion: 4
  },

  dayjs: {
    plugins: ['utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul'
  },

  nitro: {
    logLevel: isProduction ? 0 : 4
  }
})