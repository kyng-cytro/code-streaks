<template>
  <div class="h-full">
    <Head>
      <Title>Code Streaks | {{ streak ? streak.date : "404" }}</Title>
    </Head>
    <ClientOnly>
      <div v-if="streak">
        <div class="flex justify-center">
          <div
            class="flex flex-col items-center justify-center space-y-10"
            v-if="streak.question"
          >
            <!-- Page Header -->
            <div class="flex flex-col items-center space-y-4">
              <h1 class="text-2xl font-semibold">
                {{ streak.date }}'s Challenge
              </h1>
              <div class="flex flex-col items-center space-y-2 text-sm">
                <div class="flex gap-6">
                  <p>Difficulty: {{ streak.question.difficulty }}</p>
                  <p>Category: {{ streak.question.category }}</p>
                </div>
                <div>
                  <p>
                    Tags:
                    <span class="ml-1" v-for="tag in streak.question.tags">{{
                      tag.name
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- Question Review UI -->
            <QuizUIReview :question="streak.question" />
            <!-- Home Button-->
            <button
              class="rounded-md border border-teal-400 px-5 py-1.5 transition-all hover:bg-teal-500 hover:text-slate-50 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:text-slate-100"
              @click="goBack"
            >
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
      <!-- 404 Page -->
      <div
        class="flex h-full flex-col items-center justify-center gap-10"
        v-else
      >
        <div class="space-y-2">
          <h3 class="text-center text-3xl">404</h3>
          <p>Streak Not Found</p>
        </div>
        <button
          class="rounded-md border border-teal-400 px-5 py-1.5 transition-all hover:bg-teal-500 hover:text-slate-50 focus:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:text-slate-100"
          @click="goBack"
        >
          <span>Go Back</span>
        </button>
      </div>
      <div class="flex justify-center"></div>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { IStreak } from "~~/types/IStreak";

const { id } = useRoute().params;

const streak = ref<IStreak>();

// TODO: prep for decryption
const streaks = useLocalStorage<IStreak[]>("streaks", []);

streak.value = streaks.value.find(
  (streak) => streak.id == Number(id) && streak.completed == true
);

const goBack = () => {
  useRouter().back();
};
</script>
