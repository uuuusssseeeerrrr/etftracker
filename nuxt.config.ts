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
    '@nuxt/test-utils/module'
  ],
  css: [
    '@/assets/global.css',
  ],
  imports: {
    dirs: ["types"],
  },
  app : {
    head : {
      title : 'etfTracker',
      htmlAttrs : {
        lang: 'kr'
      },
      charset : 'utf-8',
    }
  }
})
