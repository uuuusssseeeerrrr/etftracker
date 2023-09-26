import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/variables.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['vuetify-nuxt-module'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  nitro: {
    compressPublicAssets: {
      gzip: true
    },
  },
});
