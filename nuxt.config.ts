// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],
  typescript: {
    strict: true,
  },
  colorMode: {
    classSuffix: "",
  },
  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Code Streaks",
      meta: [
        {
          property: "description",
          name: "description",
          content: "Stay on your toes with our daily coding quiz.",
        },
        { property: "og:title", content: "Code Streaks" },
        {
          property: "og:image",
          content: process.env.HOST_NAME + "/images/og-image.jpg",
        },
        {
          property: "og:image:url",
          content: process.env.HOST_NAME + "/images/og-image.jpg",
        },
        {
          property: "twitter:image",
          content: process.env.HOST_NAME + "/images/og-image.jpg",
        },
        {
          property: "og:description",
          content: "Stay on your toes with our daily coding quiz.",
        },
        {
          property: "og:url",
          content: process.env.HOST_NAME,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  build: {
    transpile: ["@heroicons/vue"],
  },
  runtimeConfig: {
    quizApiToken: "",
    public: {
      aesKey: "",
    },
  },
});

