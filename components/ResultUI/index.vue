<template>
  <div class="flex w-full flex-col items-center space-y-8">
    <!-- Passed UI -->
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
    <!-- Failed UI -->
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
    <!-- Share & Review Buttons -->
    <div class="flex space-x-4">
      <button
        class="rounded-md bg-teal-500 px-5 py-2.5 text-slate-50 transition-all hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
        @click="handleShare"
      >
        <span>Share</span>
      </button>
      <NuxtLink
        class="rounded-md border border-teal-400 px-5 py-2.5 transition-all hover:bg-teal-500 hover:text-slate-50 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:text-slate-100"
        :to="`/review/${id}`"
      >
        <span>Review</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IStreak } from "~~/types/IStreak";

import moment from "moment";

const { id, passed, streaks } = defineProps({
  passed: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  streaks: {
    type: Array as PropType<IStreak[]>,
    required: true,
  },
});

const is_yesterday = (a: string, b: string) => {
  const current = moment(a, "DD/MM/YYYY");
  const previous = moment(b, "DD/MM/YYYY");

  if (current.subtract(1, "day").isSame(previous)) {
    return true;
  }
  return false;
};

// FIXME: this is calculated incorrectly
const last_streak = computed(() => {
  let count = 0;
  for (let i = streaks.length - 2; i >= 0; i--) {
    if (!streaks[i].passed) {
      break;
    }
    if (streaks[i - 1]) {
      if (!is_yesterday(streaks[i].date, streaks[i - 1].date)) {
        break;
      }
    }
    count++;
  }
  return count;
});

const total_played = computed(() => {
  return streaks.filter((streak) => streak.completed === true).length;
});

// FIXME: this is not the right way to calculate
const running_streak = computed(() => {
  let count = 0;

  if (
    streaks[0] &&
    is_yesterday(streaks[0].date, moment().format("DD/MM/YYYY")) &&
    streaks[0].passed
  ) {
    count = 1;
  }

  for (let i = streaks.length - 1; i >= 0; i--) {
    if (!streaks[i].passed) {
      break;
    }
    // FIXME: this is calculated wrongly
    if (streaks[i - 1]) {
      if (!is_yesterday(streaks[i].date, streaks[i - 1].date)) {
        break;
      }
    }
    count++;
  }
  return count;
});

// FIXME: this is calculated incorrectly
const longest_streak = computed(() => {
  let longest = 0;
  let count = 0;

  streaks.forEach((streak) => {
    if (streak.passed) {
      if (streaks[streaks.indexOf(streak) - 1]) {
        if (
          is_yesterday(streak.date, streaks[streaks.indexOf(streak) - 1].date)
        ) {
          count++;
        }
      } else {
        count++;
      }
    } else {
      if (count > longest) {
        longest = count;
      }
    }
  });
  return longest > count ? longest : count;
});

const handleShare = () => {};
</script>
