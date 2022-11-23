<template>
  <Head>
    <Title>Code Streaks | Today</Title>
  </Head>
  <div class="mt-6 flex flex-col items-center justify-center space-y-10">
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
            Tags: <span v-for="tag in question.tags">{{ tag.name }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Quiz UI-->
    <QuizUI :question="question3" />
  </div>
</template>

<script setup lang="ts">
const question1 = {
  id: 578,
  question:
    "How do we access the value of 'd' later? $a = array(     'a',     3 => 'b',     1 => 'c',     'd' );",
  description: null,
  answers: {
    answer_a: "$a[0]",
    answer_b: "$a[3]",
    answer_c: "$a[2]",
    answer_d: "$a[1]",
    answer_e: "$a[4]",
    answer_f: null,
  },
  multiple_correct_answers: "false",
  correct_answers: {
    answer_a_correct: "false",
    answer_b_correct: "false",
    answer_c_correct: "false",
    answer_d_correct: "false",
    answer_e_correct: "true",
    answer_f_correct: "false",
  },
  correct_answer: "answer_a",
  explanation: null,
  tip: null,
  tags: [
    {
      name: "PHP",
    },
  ],
  category: "Linux",
  difficulty: "Hard",
};
const question2 = {
  id: 333,
  question:
    "If you insert (00) as the value of the year in a date column, what will be stored in the database?",
  description: null,
  answers: {
    answer_a: "0000",
    answer_b: "1900",
    answer_c: "2000",
    answer_d: "Cannot be determined",
    answer_e: null,
    answer_f: null,
  },
  multiple_correct_answers: "false",
  correct_answers: {
    answer_a_correct: "true",
    answer_b_correct: "false",
    answer_c_correct: "false",
    answer_d_correct: "false",
    answer_e_correct: "false",
    answer_f_correct: "false",
  },
  correct_answer: "answer_a",
  explanation: null,
  tip: null,
  tags: [
    {
      name: "MySQL",
    },
  ],
  category: "SQL",
  difficulty: "Hard",
};
const question = {
  id: 494,
  question: "Which of the following is true about Cookies?",
  description: null,
  answers: {
    answer_a:
      "Cookies are limited to about 4 KB of data . Not enough to store required data.",
    answer_b:
      "Cookies are included with every HTTP request, thereby slowing down your web application by transmitting the same data.",
    answer_c:
      "Cookies are included with every HTTP request, thereby sending data unencrypted over the internet.",
    answer_d: "All of the above.",
    answer_e: null,
    answer_f: null,
  },
  multiple_correct_answers: "false",
  correct_answers: {
    answer_a_correct: "false",
    answer_b_correct: "false",
    answer_c_correct: "false",
    answer_d_correct: "true",
    answer_e_correct: "false",
    answer_f_correct: "false",
  },
  correct_answer: "answer_a",
  explanation: null,
  tip: null,
  tags: [
    {
      name: "HTML",
    },
  ],
  category: "Code",
  difficulty: "Hard",
};

const question3 = {
  id: 454,
  question:
    "Which HTML Tag is used to define a client - side script such as the Javascript?",
  description: null,
  answers: {
    answer_a: "<unscript>",
    answer_b: "None Of The Above",
    answer_c: "Both Above",
    answer_d: "<script>",
    answer_e: null,
    answer_f: null,
  },
  multiple_correct_answers: "false",
  correct_answers: {
    answer_a_correct: "false",
    answer_b_correct: "false",
    answer_c_correct: "false",
    answer_d_correct: "true",
    answer_e_correct: "false",
    answer_f_correct: "false",
  },
  correct_answer: "answer_a",
  explanation: null,
  tip: null,
  tags: [
    {
      name: "HTML",
    },
  ],
  category: "Code",
  difficulty: "Hard",
};
</script>
