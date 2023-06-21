import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';
import { ExamSolution } from 'src/app/models/exam-solution';
import { ExamSolutionService } from '../services/exam-solution.service';
import { PopupComponent, PopupData } from 'src/app/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { toArray } from 'rxjs';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  @Input() examId?: string;
  examQuestions!: any;
  trueFalseQuestion?: string;
  chooseQuestion?: string;
  fillQuestion?: string;
  shortQuestion?: string;
  questions?: any[];
  currentPage!: number;
  options: string[] = [];

  constructor(
    private examService: ExamService,
    private examSolutionService: ExamSolutionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.currentPage = 1;
    this.examService.getQuestions(this.examId!).subscribe((data) => {
      this.examQuestions = data;
      this.loadQuestions();
    });
  }
  nextPage() {
    if (this.currentPage == 4) {
      this.currentPage++;
      this.questions = [];
      return;
    }
    this.currentPage++;
    this.loadQuestions();
  }
  previousPage() {
    if (this.currentPage == 1) {
      this.currentPage--;
      this.questions = [];
      return;
    }
    this.currentPage--;
    this.loadQuestions();
  }
  loadQuestions() {
    this.questions = [];
    this.examQuestions.forEach((element: any) => {
      if (this.currentPage == 1 && element.questionType == 'True_False') {
        this.questions?.push(element);
      } else if (this.currentPage == 2 && element.questionType == 'Choose') {
        this.questions?.push(element);
      } else if (this.currentPage == 3 && element.questionType == 'Fill') {
        this.questions?.push(element);
      } else if (
        this.currentPage == 4 &&
        element.questionType == 'Short_Answer'
      ) {
        this.questions?.push(element);
      }
    });
  }
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
  addQuestion(type: number) {
    if (type == 1) {
      const question = new Question();
      question.question = this.trueFalseQuestion!;
      question.questionType = 'True_False';
      this.examService
        .addQuestions(this.examId!, [question])
        .subscribe((result) => {
          this.examService.getQuestions(this.examId!).subscribe((data) => {
            this.examQuestions = data;
            this.loadQuestions();
            this.trueFalseQuestion = '';
          });
        });
    }
    if (type == 2) {
      const question = new Question();
      question.question = this.chooseQuestion!;
      question.questionType = 'Choose';
      question.options = this.options;
      this.examService
        .addQuestions(this.examId!, [question])
        .subscribe((result) => {
          this.examService.getQuestions(this.examId!).subscribe((data) => {
            this.examQuestions = data;
            this.loadQuestions();
            this.chooseQuestion = '';
            this.options = [];
          });
        });
    }
    if (type == 3) {
      const question = new Question();
      question.question = this.fillQuestion!;
      question.questionType = 'Fill';
      this.examService
        .addQuestions(this.examId!, [question])
        .subscribe((result) => {
          this.examService.getQuestions(this.examId!).subscribe((data) => {
            this.examQuestions = data;
            this.loadQuestions();
            this.fillQuestion = '';
          });
        });
    }
    if (type == 4) {
      const question = new Question();
      question.question = this.shortQuestion!;
      question.questionType = 'Short_Answer';
      this.examService
        .addQuestions(this.examId!, [question])
        .subscribe((result) => {
          this.examService.getQuestions(this.examId!).subscribe((data) => {
            this.examQuestions = data;
            this.loadQuestions();
            this.shortQuestion = '';
          });
        });
    }
  }
  removeQuestion(questionType: string, questionNumber: number) {
    this.examService
      .removeQuestions(this.examId!, questionType, questionNumber)
      .subscribe((result) => {
        this.examService.getQuestions(this.examId!).subscribe((data) => {
          this.examQuestions = data;
          this.loadQuestions();
        });
      });
  }
  showSnackbarAction(content: string, action: string | undefined) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {});
    snack.onAction().subscribe(() => {});
  }
}
