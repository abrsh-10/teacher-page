export class Exam {
  examId!: string;
  examName!: string;
  weight!: number;
  startTime!: string;
  creator?: string;
  duration!: number;
  courseId!: string;
  active!: boolean;
  expanded?: boolean;
}
