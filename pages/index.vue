<template>
  <div class="h-full">
    <Head>
      <Title>Code Streaks | Today</Title>
    </Head>
    <ClientOnly>
      <!-- Home page -->
      <div v-if="today_streak">
        <div
          class="flex flex-col items-center justify-center space-y-10"
          v-if="today_streak.question"
        >
          <!-- Page Header -->
          <div class="flex flex-col items-center space-y-4">
            <h1 class="text-2xl font-semibold">Today's Challenge</h1>
            <div class="flex flex-col items-center space-y-2 text-sm">
              <div class="flex gap-6">
                <p>Difficulty: {{ today_streak.question.difficulty }}</p>
                <p>Category: {{ today_streak.question.category }}</p>
              </div>
              <div>
                <p>
                  Tags:
                  <span
                    class="ml-1"
                    v-for="tag in today_streak.question.tags"
                    >{{ tag.name }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <!-- Quiz UI -->
          <QuizUI
            :question="today_streak.question"
            @passed="passQuiz"
            @failed="failQuiz"
            v-if="!show_results"
          />
          <!-- Result UI -->
          <ResultUI
            :passed="today_streak.passed"
            :streaks="streaks"
            :id="today_streak.id"
            v-if="show_results"
          />
        </div>
      </div>
      <!-- Loading animations -->
      <div class="flex h-full items-center justify-center" v-else>
        <div role="status">
          <svg
            class="inline h-16 w-16 animate-spin fill-teal-500 text-gray-200 dark:text-gray-600"
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
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { IShortQuestion, IStreak } from "~~/types/IStreak";
import moment from "moment";
import CryptoAES from "crypto-js/aes";

// Show or hide results
const show_results = ref(false);

// Current streak
const today_streak = ref<IStreak>();

// Date for today
let today = moment().format("DD/MM/YYYY");

// Fetch local storage
const streaks = useLocalStorage<IStreak[]>("streaks", []);

const encrypt = (data: string, key: string) => {
  var encrypted = CryptoAES.encrypt(data, key);
  return encrypted.toString();
};

// Fetch from api and update local storage
const fetchNStore = async () => {
  if (process.server) {
    console.log("Fetching from server");
  }
  if (!process.server) {
    console.log("Fetching from client");
  }
  const { data } = await useFetch("/api/quiz");
  if (data.value != null) {
    let encrypted_answer;
    if (!process.server) {
      encrypted_answer = encrypt(
        data.value.correct_answer,
        useRuntimeConfig().public.aesKey
      );
    }
    const streak: IStreak = {
      id: streaks.value.length,
      date: today,
      question: {
        ...data.value,
        correct_answer: encrypted_answer ?? data.value.correct_answer,
      } as IShortQuestion,
      completed: false,
      passed: false,
    };
    streaks.value.push(streak);
    today_streak.value = streak;
  }
};

// Check local storage
if (streaks.value != null) {
  if (streaks.value.length < 1) {
    fetchNStore();
  } else {
    const last_streak = streaks.value[streaks.value.length - 1];
    if (last_streak.date !== today) {
      fetchNStore();
    } else {
      today_streak.value = last_streak;
    }
  }
}

// Show results
if (today_streak.value) {
  if (today_streak.value.completed == true) {
    show_results.value = true;
  }
}

// Pass Quiz
const passQuiz = () => {
  if (today_streak.value) {
    today_streak.value.completed = true;
    today_streak.value.passed = true;
    streaks.value[streaks.value.length - 1] = today_streak.value;

    show_results.value = true;
  }
};

// Fail Quiz
const failQuiz = () => {
  if (today_streak.value) {
    today_streak.value.completed = true;
    today_streak.value.passed = false;
    streaks.value[streaks.value.length - 1] = today_streak.value;

    show_results.value = true;
  }
};
</script>
