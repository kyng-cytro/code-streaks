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
        class="cursor-pointer rounded-md border-2 border-slate-300 bg-slate-200 py-4 text-left dark:border-slate-400 dark:bg-slate-500"
        v-for="(value, id, index) in question.answers"
        :class="{
          hidden: !value,
          'border-l-4 border-l-teal-500  bg-slate-400  dark:border-l-teal-500 dark:bg-slate-800':
            `${id.toString()}_correct` == question.correct_answer,
        }"
        :key="index"
      >
        <p class="px-6">{{ value }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IShortQuestion } from "~~/types/IStreak";

const { question } = defineProps({
  question: {
    type: Object as PropType<IShortQuestion>,
    required: true,
  },
});
</script>
