import { Component, Input } from '@angular/core';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { CourseMaterialService } from '../services/course-material.service';

@Component({
  selector: 'app-assignment-solution',
  templateUrl: './assignment-solution.component.html',
  styleUrls: ['./assignment-solution.component.css'],
})
export class AssignmentSolutionComponent {
  @Input() assignmentSolution!: AssignmentSolution;

  constructor(private courseMaterialService: CourseMaterialService) {}

  downloadFile(id: string, fileName: string) {
    this.courseMaterialService.downloadFile(id).subscribe((data: Blob) => {
      const downloadUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
    });
  }
}
