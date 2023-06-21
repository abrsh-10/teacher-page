import { Answer } from './answer';

export class ExamSolution {
  solutionId?: string;
  answers!: Answer[];
  examId!: String;
  studentEmail!: string;
  seen?: boolean;
  constructor(answers: Answer[], examId: string, studentEmail: string) {
    this.answers = answers;
    this.examId = examId;
    this.studentEmail = studentEmail;
  }
}
