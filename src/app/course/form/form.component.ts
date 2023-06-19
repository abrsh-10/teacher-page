import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { Assignments } from 'src/app/models/assignments';
import { CourseMaterial } from 'src/app/models/course-material';

export interface FormData {
  title: string;
  assignments?: any[];
  fileIncluded: boolean;
  courseId?: string;
  type?: number; //to know whether it is courseMaterial or assignment
  positiveButton: string;
  negativeButton?: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  file!: ElementRef;
  description?: string;
  assignmentId?: string;
  selectedFile?: File;
  assignmentSolution?: AssignmentSolution;
  courseMaterial?: CourseMaterial;
  assignment?: Assignments;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  returnTrue(): void {
    if (this.data.type == null) {
      this.assignmentSolution = new AssignmentSolution(
        this.selectedFile!,
        sessionStorage.getItem('email')!,
        this.description!,
        this.assignmentId!
      );
      this.dialogRef.close(this.assignmentSolution);
    } else if (this.data.type == 0) {
      this.courseMaterial = new CourseMaterial(
        this.selectedFile!,
        sessionStorage.getItem('email')!,
        this.description!,
        this.data.courseId!
      );
      this.dialogRef.close(this.courseMaterial);
    } else if (this.data.type == 1) {
      this.assignment = new Assignments(
        this.selectedFile!,
        sessionStorage.getItem('email')!,
        this.description!,
        this.data.courseId!
      );
      this.dialogRef.close(this.assignment);
    }
  }

  returnFalse(): void {
    this.dialogRef.close(false);
  }
}
