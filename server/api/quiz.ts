import { IQuestion } from "~/types/IQuestion";

function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      f(k, obj[k]);
    }
  }
}

export default defineEventHandler(async () => {
  const { QUIZ_API_TOKEN } = useRuntimeConfig();

  const data: IQuestion[] = await $fetch(
    `https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_TOKEN}&limit=1&difficulty=hard`
  );

  objForEach(data[0].correct_answers, (k, v) => {
    if (v === "true") {
      data[0].correct_answer = k;
    }
  });

  const { id, question, answers, tags, category, difficulty, correct_answer } =
    data[0];

  return {
    id,
    question,
    answers,
    tags,
    category,
    difficulty,
    correct_answer,
  };
});
