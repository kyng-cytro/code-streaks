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
          hid: "description",
          name: "description",
          content: "Stay on your toes with our daily coding quiz.",
        },
        { hid: "og:title", property: "og:title", content: "Code Streaks" },
        {
          hid: "og:image",
          property: "og:image",
          content: process.env.HOST_NAME + "/images/og-image.jpg",
        },
        {
          hid: "og:image:url",
          property: "og:image:url",
          content: process.env.HOST_NAME + "/images/og-image.jpg",
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: process.env.HOST_NAME + "/images/og-image.jpg",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Stay on your toes with our daily coding quiz.",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.HOST_NAME,
        },
        {
          hid: "twitter:card",
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
