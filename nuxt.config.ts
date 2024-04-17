// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  nitro: {
    storage: {
      fs: {
        driver: "fs",
        base: "./public",
      },
    },
  },
});
