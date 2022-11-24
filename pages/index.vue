<template>
  <Head>
    <Title>Code Streaks | Today</Title>
  </Head>
  <div
    class="mt-6 flex flex-col items-center justify-center space-y-10"
    v-if="data"
  >
    <!-- Page Header -->
    <div class="flex flex-col items-center space-y-4">
      <h1 class="text-2xl font-semibold">Today's Challenge</h1>
      <div class="flex flex-col items-center space-y-2 text-sm">
        <div class="flex gap-6">
          <p>Difficulty: {{ data.difficulty }}</p>
          <p>Category: {{ data.category }}</p>
        </div>
        <div>
          <p>
            Tags:
            <span class="ml-1" v-for="tag in data.tags">{{ tag.name }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Quiz UI-->
    <QuizUI :question="data" />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/quiz");
</script>
