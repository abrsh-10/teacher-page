import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { Assignments } from 'src/app/models/assignments';
import { CourseMaterial } from 'src/app/models/course-material';
import { Exam } from 'src/app/models/exam';
import { Lesson } from 'src/app/models/lesson';
import { Topic } from 'src/app/models/topic';
import { UserService } from '../services/user.service';
import { User } from 'src/app/models/user';

export interface FormData {
  title: string;
  assignments?: any[];
  fileIncluded: boolean;
  courseId?: string; //TopicId for adding lessons
  type?: number; //to know whether it is courseMaterial,assignment,lesson,exam,...
  positiveButton: string;
  negativeButton?: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  file!: ElementRef;
  lessonTitle?: string;
  videoId?: string;
  description?: string;
  assignmentId?: string;
  selectedFile?: File;
  assignmentSolution?: AssignmentSolution;
  courseMaterial?: CourseMaterial;
  assignment?: Assignments;

  examName?: string;
  startDateTime?: string;
  examWeight?: number;
  examDuration?: number;

  users?: User[];
  studentEmail?: string;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    if (this.data.type == 4) {
      this.userService.getByCourse(this.data.courseId!).subscribe((result) => {
        this.users = result;
      });
    }
  }

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
    } else if (this.data.type == 2) {
      const lesson = new Lesson();
      lesson.lessonTitle = this.lessonTitle!;
      lesson.lessonDescription = this.description!;
      lesson.lessonVideoId = this.videoId!;
      lesson.topicId = this.data.courseId!;

      this.dialogRef.close(lesson);
    } else if (this.data.type == 3) {
      const selectedDateTime = new Date(this.startDateTime!);
      const formattedDate = selectedDateTime.toISOString();
      const exam = new Exam();
      exam.examName = this.examName!;
      exam.weight = this.examWeight!;
      exam.duration = this.examDuration!;
      exam.courseId = this.data.courseId!;
      exam.creator = sessionStorage.getItem('email')!;
      exam.startTime = formattedDate;

      this.dialogRef.close(exam);
    } else if (this.data.type == 4) {
      this.dialogRef.close(this.studentEmail);
    }
  }

  returnFalse(): void {
    this.dialogRef.close(false);
  }
}
