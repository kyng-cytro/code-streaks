import { Calendar } from "v-calendar";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Calendar", Calendar);
});
