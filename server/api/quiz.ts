import moment from "moment";
import type { IQuestion } from "@/types/IQuestion";

function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      f(k, obj[k]);
    }
  }
}

export default defineCachedEventHandler(
  async () => {
    const { quizApiToken } = useRuntimeConfig();

    const data: IQuestion[] = await $fetch(
      `https://quizapi.io/api/v1/questions?apiKey=${quizApiToken}&limit=1`,
    );

    objForEach(data[0].correct_answers, (k, v) => {
      if (v === "true") {
        data[0].correct_answer = k;
      }
    });

    const {
      id,
      question,
      answers,
      tags,
      category,
      difficulty,
      correct_answer,
    } = data[0];

    return {
      id,
      question,
      answers,
      tags,
      category,
      difficulty,
      correct_answer,
    };
  },
  {
    name: `quiz-${moment().format("YYYY-MM-DD")}`,
    maxAge: moment().endOf("day").diff(moment(), "seconds"),
  },
);
