import { Answers } from "~~/types/IAnswers";
import { Tag } from "~~/types/ITag";

export interface IStreak {
  date: string;
  question: IShortQuestion;
  completed: boolean;
  passed: boolean;
}

export interface IShortQuestion {
  id: number;
  question: string;
  answers: Answers;
  tags: Tag[];
  category: string;
  difficulty: string;
  correct_answer: string;
}
