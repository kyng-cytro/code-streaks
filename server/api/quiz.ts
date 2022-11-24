import { IQuestion } from "~/types/IQuestion";

export default defineEventHandler(async () => {
  const { QUIZ_API_TOKEN } = useRuntimeConfig();

  // NOTE: turned this off cause its making too many requests
  // const data: IQuestion[] = await $fetch(
  //   `https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_TOKEN}&limit=1&difficulty=hard`
  // );

  // NOTE: temporarily hardcoded
  const data: IQuestion[] = [
    {
      id: 783,
      question:
        "What does the fopen() function requires for it to execute properly:",
      description: "",
      answers: {
        answer_a:
          "It requires two arguments stating first the file name and then mode in which to operate.",
        answer_b: "It requires one argument, the file name.",
        answer_c:
          "It requires one argument, the file name. With a second argument being available if we want to use it, in which mode to oparate.",
        answer_d:
          "It requires two arguments, the file name and the extension of the file we are opening.",
        answer_e: "",
        answer_f: "",
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
      correct_answer: "",
      explanation: "",
      tip: "",
      tags: [
        {
          name: "PHP",
        },
      ],
      category: "Code",
      difficulty: "Hard",
    },
  ];

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
