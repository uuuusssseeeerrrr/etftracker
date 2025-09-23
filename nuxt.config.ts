// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
    timeline: {
      enabled: false,
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils/module'
  ],
  css: [
    '@/assets/global.css',
  ],

  imports: {
    dirs: ["types"],
  },

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
    userNm: process.env.NUXT_USER_NM,
    pwd: process.env.NUXT_PWD,
    database: process.env.NUXT_DATABASE,
    dbHost: process.env.NUXT_DB_HOST,
    dbPort: process.env.NUXT_DB_PORT,
    kisKey: process.env.NUXT_KIS_KEY,
    kisSecret: process.env.NUXT_KIS_SECRET,
    batchToken: process.env.BATCHTOKEN,
    TZ: 'Asia/Seoul'
  },

  compatibilityDate: '2025-09-31',

  future: {
    compatibilityVersion: 4
  },
})