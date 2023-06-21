import { Component, Input } from '@angular/core';
import { ExamSolution } from 'src/app/models/exam-solution';
import { ExamSolutionService } from '../services/exam-solution.service';

@Component({
  selector: 'app-exam-solution',
  templateUrl: './exam-solution.component.html',
  styleUrls: ['./exam-solution.component.css'],
})
export class ExamSolutionComponent {
  @Input() examSolution!: ExamSolution;
  constructor(private examSolutionService: ExamSolutionService) {}

  markSeen() {
    this.examSolutionService
      .markSeen(this.examSolution.solutionId!)
      .subscribe();
  }
}
