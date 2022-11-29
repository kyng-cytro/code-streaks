<template>
  <div class="flex w-full flex-col items-center space-y-8">
    <div class="flex flex-col items-center space-y-6 pt-3" v-if="passed">
      <NuxtImg class="h-52 w-52" src="/images/fire.png" />
      <div class="flex flex-col items-center space-y-5 text-sm sm:text-base">
        <h3 class="text-xl font-semibold uppercase">Holding Strong</h3>
        <div class="flex space-x-6">
          <p>Running Streak: {{ running_streak }}</p>
          <p>Longest Streak: {{ longest_streak }}</p>
        </div>
        <div>
          <p>Total Played: {{ total_played }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center space-y-6 pt-3" v-else>
      <NuxtImg class="h-52 w-52" src="/images/cold.png" />
      <div class="flex flex-col items-center space-y-5 text-sm sm:text-base">
        <h3 class="text-xl font-semibold uppercase">Broken Streak</h3>
        <div class="flex space-x-6">
          <p>Last Streak: {{ last_streak }}</p>
          <p>Longest Streak: {{ longest_streak }}</p>
        </div>
        <div>
          <p>Total Played: {{ total_played }}</p>
        </div>
      </div>
    </div>
    <div>
      <button
        class="cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-slate-100 transition-all hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
      >
        <span>Share Result</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IStreak } from "~~/types/IStreak";

const { passed, streaks } = defineProps({
  passed: {
    type: Boolean,
    required: true,
  },
  streaks: {
    type: Array as PropType<IStreak[]>,
    required: true,
  },
});

const last_streak = computed(() => {
  let count = 0;
  for (let i = streaks.length - 2; i >= 0; i--) {
    if (!streaks[i].passed) break;
    count++;
  }
  return count;
});

const total_played = computed(() => {
  return streaks.filter((streak) => streak.completed === true).length;
});

const running_streak = computed(() => {
  let count = 0;
  for (let i = streaks.length - 1; i >= 0; i--) {
    if (!streaks[i].passed) break;
    count++;
  }
  return count;
});

const longest_streak = computed(() => {
  let longest = 0;
  let count = 0;
  streaks.forEach((streak) => {
    if (streak.passed) {
      count++;
    } else {
      if (count > longest) {
        longest = count;
      }
    }
  });
  return longest > count ? longest : count;
});
</script>
