// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "@vueuse/nuxt"],
  typescript: {
    strict: true,
  },
  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Code Streaks",
      meta: [
        {
          name: "description",
          content: "Stay on your toes with our daily coding quiz.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  build: {
    transpile: ["@heroicons/vue"],
  },
  runtimeConfig: {
    QUIZ_API_TOKEN: process.env.QUIZ_API_TOKEN,
  },
});
