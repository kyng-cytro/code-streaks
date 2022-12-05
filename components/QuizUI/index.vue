<template>
  <div class="flex max-w-lg flex-col items-center justify-center space-y-10">
    <!-- Question -->
    <div
      class="rounded-xl border-2 border-slate-400 bg-slate-300 py-10 px-6 dark:border-slate-400 dark:bg-slate-700"
    >
      <h3 class="text-lg">{{ question.question }}</h3>
    </div>
    <!-- Multi Choice Options -->
    <div class="flex w-full flex-col space-y-3">
      <p class="px-1">Options</p>
      <button
        class="cursor-pointer rounded-md border-2 border-slate-300 bg-slate-200 py-4 text-left hover:border-l-4 hover:border-l-teal-500 hover:bg-slate-300 focus:border-l-4 focus:border-l-teal-500 focus:bg-slate-300 focus:outline-none dark:border-slate-400 dark:bg-slate-500 dark:hover:border-l-teal-500 dark:hover:bg-slate-700 dark:focus:border-l-teal-500 dark:focus:bg-slate-700"
        v-for="(value, id, index) in question.answers"
        :class="{
          hidden: !value,
          'border-l-4 border-l-teal-500  bg-slate-400  dark:border-l-teal-500 dark:bg-slate-800':
            id.toString() == selected,
        }"
        :key="index"
        @click="selected = `${id.toString()}_correct`"
      >
        <p class="px-6">{{ value }}</p>
      </button>
    </div>
    <!-- Submit Button -->
    <button
      class="cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-slate-100 transition-all hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
      :disabled="loading"
      @click="answerQuestion"
    >
      <div v-if="loading" role="status">
        <svg
          class="inline h-8 w-8 animate-spin fill-slate-200 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <span v-else>Submit Answer</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { IShortQuestion } from "~~/types/IStreak";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";

const selected = ref("");

const loading = ref(false);

const emit = defineEmits(["passed", "failed"]);

const decrypt = (data: string, key: string) => {
  var decrypted = CryptoAES.decrypt(data, key);
  return decrypted.toString(CryptoENC);
};

const answerQuestion = () => {
  if (!selected.value) {
    return;
  }

  loading.value = true;

  // TODO: hard coded key here
  const correct_answer = decrypt(
    question.correct_answer,
    useRuntimeConfig().public.aesKey
  );

  if (correct_answer == selected.value) {
    emit("passed");
  } else {
    emit("failed");
  }
};
const { question } = defineProps({
  question: {
    type: Object as PropType<IShortQuestion>,
    required: true,
  },
});
</script>
