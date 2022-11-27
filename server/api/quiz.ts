import { IQuestion } from "~/types/IQuestion";

export default defineEventHandler(async () => {
  const { QUIZ_API_TOKEN } = useRuntimeConfig();

  // NOTE: Still making too many calls
  const data: IQuestion[] = await $fetch(
    `https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_TOKEN}&limit=1&difficulty=hard`
  );

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
