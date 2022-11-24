import { Answers } from "~/types/IAnswers";
import { Tag } from "~/types/ITag";
import { Correctanswers } from "~/types/ICorrectanswers";

export interface IQuestion {
  id: number;
  question: string;
  description?: string;
  answers: Answers;
  multiple_correct_answers: string;
  correct_answers: Correctanswers;
  correct_answer: string;
  explanation?: string;
  tip?: string;
  tags: Tag[];
  category: string;
  difficulty: string;
}
