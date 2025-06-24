<template>
  <Head>
    <Title>Code Streaks | Past</Title>
  </Head>
  <div class="flex h-full flex-col items-center gap-10">
    <h3 class="text-2xl font-semibold">Streak Calendar</h3>

    <div class="w-full max-w-2xl px-3">
      <ClientOnly>
        <Calendar
          @dayclick="handleClick"
          :attributes="attributes"
          is-dark="{ selector: ':root', darkClass: 'dark' }"
          expanded
        />
        <template #fallback>
          <div
            class="w-full bg-slate-300 dark:bg-slate-700 rounded-md h-[270px]"
          />
        </template>
      </ClientOnly>
    </div>
    <div
      class="scrollbar-hide flex max-h-[750px] max-w-xl flex-col space-y-2 overflow-y-auto overflow-x-hidden rounded-xl border-2 border-slate-400 bg-slate-300 py-10 px-6 dark:border-slate-400 dark:bg-slate-700"
    >
      <h3 class="font-semibold">Note:</h3>
      <p>
        Tap on that day to view the question for that day. But keep in mind that
        you can only read questions for days that are colored.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayClick } from "@/types/IDayClick";
import type { IStreak } from "@/types/IStreak";
import moment from "moment";
import "v-calendar/dist/style.css";

interface Attribute {
  highlight: {
    color: string;
    fillMode: string;
  };
  dates: Date;
}

const attributes = ref<Attribute[]>([]);

const streaks = useLocalStorage<IStreak[]>("streaks", []);

streaks.value.forEach((streak) => {
  if (streak.completed) {
    attributes.value.push({
      highlight: {
        color: streak.passed ? "green" : "red",
        fillMode: "solid",
      },
      dates: moment(streak.date, "DD/MM/YYYY").toDate(),
    });
  }
});

const handleClick = (day: DayClick, e: Event) => {
  if (day.attributes.length < 1) {
    return;
  }
  const id = streaks.value.find(
    (streak) => streak.date === moment(day.id).format("DD/MM/YYYY"),
  )?.id;
  (e.target as HTMLElement).blur();
  navigateTo("/review/" + id);
};
</script>
