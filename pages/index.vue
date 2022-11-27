<template>
  <Head>
    <Title>Code Streaks | Today</Title>
  </Head>
  <ClientOnly>
    <div
      class="mt-6 flex flex-col items-center justify-center space-y-10"
      v-if="question"
    >
      <!-- Page Header -->
      <div class="flex flex-col items-center space-y-4">
        <h1 class="text-2xl font-semibold">Today's Challenge</h1>
        <div class="flex flex-col items-center space-y-2 text-sm">
          <div class="flex gap-6">
            <p>Difficulty: {{ question.difficulty }}</p>
            <p>Category: {{ question.category }}</p>
          </div>
          <div>
            <p>
              Tags:
              <span class="ml-1" v-for="tag in question.tags">{{
                tag.name
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- Quiz UI-->
      <QuizUI :question="question" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { IShortQuestion, IStreak } from "~~/types/IStreak";

const question = ref();

let today = new Date();

today.setHours(0, 0, 0, 0);

const streaks = useLocalStorage<IStreak[]>("streaks", []);

const fetchNStore = async () => {
  console.log("Fetching");
  const { data } = await useFetch("/api/quiz");
  const streak: IStreak = {
    date: today,
    question: data.value as IShortQuestion,
    completed: false,
    passed: false,
  };
  streaks.value.push(streak);
  question.value = streak.question;
};

if (streaks.value.length < 1) {
  fetchNStore();
} else {
  const last_streak = streaks.value[0];
  if (
    new Date(last_streak.date).getMilliseconds() !== today.getMilliseconds()
  ) {
    fetchNStore();
  } else {
    question.value = last_streak.question;
  }
}
</script>
