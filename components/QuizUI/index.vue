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
          hidden: value == null,
          'border-l-4 border-l-teal-500  bg-slate-400  dark:border-l-teal-500 dark:bg-slate-800':
            id.toString() == selected,
        }"
        :key="index"
        @click="selected = id.toString()"
      >
        <p class="px-6">{{ value }}</p>
      </button>
    </div>
    <!-- Submit Button -->
    <button
      class="cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-slate-100 hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
    >
      <span>Submit Answer</span>
    </button>
  </div>
</template>
<script setup lang="ts">
const selected = ref("");
const { question } = defineProps({
  question: {
    type: Object,
    required: true,
  },
});
</script>
