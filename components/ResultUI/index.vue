<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
  />
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
    <div class="space-y-4 transition-all duration-500 ease-in-out">
      <div class="flex space-x-4">
        <div
          tabindex="0"
          class="mx-auto flex w-32 items-center justify-between rounded-md bg-teal-400 px-3 text-slate-100 shadow-md shadow-slate-700 transition-all duration-500 ease-in-out hover:w-36 hover:shadow-lg hover:shadow-slate-700 focus:w-36 focus:shadow-lg focus:shadow-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:text-slate-700 dark:shadow-slate-900 hover:dark:shadow-slate-900 focus:dark:shadow-slate-900"
        >
          <ShareNetwork
            class="hover:text-slate-400 focus:text-slate-400 focus:outline-none"
            network="twitter"
            url="https://code-streaks.vercel.app/"
            :title="message"
            hashtags="coding,streak"
          >
            <i class="fab fah fa-lg fa-twitter"></i>
          </ShareNetwork>
          <ShareNetwork
            class="hover:text-slate-400 focus:text-slate-400 focus:outline-none"
            network="whatsapp"
            url="https://code-streaks.vercel.app/"
            :title="message"
          >
            <i class="fab fah fa-lg fa-whatsapp"></i>
          </ShareNetwork>

          <ShareNetwork
            class="hover:text-slate-400 focus:text-slate-400 focus:outline-none"
            network="telegram"
            url="https://code-streaks.vercel.app/"
            :title="message"
          >
            <i class="fab fah fa-lg fa-telegram"></i>
          </ShareNetwork>
        </div>
        <NuxtLink
          class="rounded-md border border-teal-400 px-5 py-2.5 transition-all duration-500 ease-in-out hover:bg-teal-500 hover:text-slate-50 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:text-slate-100"
          :to="`/review/${id}`"
        >
          <span>Review</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-enter-active {
  animation: shutter-in-bottom 0.8s ease 0s 1 normal none;
}
.share-leave-active {
  transition: opacity 0.5s;
}
.share-leave-to {
  opacity: 0;
}

@keyframes shutter-in-bottom {
  0% {
    transform: rotateX(100deg);
    transform-origin: bottom;
    opacity: 0;
  }
  100% {
    transform: rotateX(0);
    transform-origin: bottom;
    opacity: 1;
  }
}
</style>

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

const total_played = computed(() => {
  return streaks.filter((streak) => streak.completed === true).length;
});

const last_streak = computed(() => {
  let count = 0;

  // starting from -2 cause we don't want to count today's fail
  for (let i = streaks.length - 2; i >= 0; i--) {
    if (
      streaks[i].passed &&
      is_yesterday(streaks[i + 1].date, streaks[i].date)
    ) {
      count++;
    } else {
      break;
    }
  }
  return count;
});

const running_streak = computed(() => {
  // Using 1 here cause we know they have at least 1 already
  let count = 1;

  // starting from -2 cause we already counted today's win in above line
  for (let i = streaks.length - 2; i >= 0; i--) {
    if (
      streaks[i].passed &&
      is_yesterday(streaks[i + 1].date, streaks[i].date)
    ) {
      count++;
    } else {
      break;
    }
  }
  return count;
});

const longest_streak = computed(() => {
  let longest = 0;
  let count = 0;

  // looping forward cause we are spanning the entire array
  for (let i = 0; i < streaks.length; i++) {
    if (i == 0) {
      if (streaks[i].passed) {
        count++;
      }
    } else {
      if (
        streaks[i].passed &&
        is_yesterday(streaks[i].date, streaks[i - 1].date)
      ) {
        count++;
      } else {
        if (count > longest) {
          longest = count;
          count = 0;
        } else {
          count = 0;
        }
      }
    }
  }

  return longest > count ? longest : count;
});

const message = passed
  ? `Just hit a new personal record with a streak of ${running_streak.value} days! Keep pushing.`
  : `Just had a setback and broke my ${last_streak.value} days! long streak, but I'm not giving up! Time to start a new streak`;
</script>
