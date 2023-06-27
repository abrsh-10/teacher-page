import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../../models/course';
import { CourseMaterialService } from '../services/course-material.service';
import { TopicService } from '../services/topic.service';
import { LessonService } from '../services/lesson.service';
import { Topic } from '../../models/topic';
import { ExamService } from '../services/exam.service';
import { DatePipe } from '@angular/common';
import { AssignmentService } from '../services/assignment.service';
import { Exam } from '../../models/exam';
import { FormComponent, FormData } from 'src/app/course/form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentSolutionService } from '../services/assignment-solution.service';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { PopupComponent, PopupData } from 'src/app/popup/popup.component';
import { Assignments } from 'src/app/models/assignments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseMaterial } from 'src/app/models/course-material';
import { ExamSolutionService } from '../services/exam-solution.service';
import { ExamSolution } from 'src/app/models/exam-solution';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [DatePipe],
})
export class CourseComponent implements OnInit {
  showSideBar = true;
  email!: string;
  courseId: any;
  course: Course = new Course();
  showCourseMaterial = true;
  showTopic = false;
  showLesson = false;
  showExam = false;
  showAssignment = false;
  showQuestion? = false;
  showVideo? = false;
  showAssignmentSolution? = false;
  showExamSolution? = false;
  courseMaterials?: any;
  topics?: any;
  topicId?: string;
  topicTitle?: string;
  topicDescription?: string;
  lessons?: any;
  exams?: any;
  assignments?: any;
  examQuestions?: any;

  questions?: any[];
  examId?: string;
  examDuration?: number;
  examActiveStatus?: boolean;
  currentPage = 0;
  questionsPerPage = 4;

  videoId?: string;

  topic_title?: string;
  topic_description?: string;

  assignmentSolution?: AssignmentSolution;
  examSolution?: ExamSolution;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseMaterialService: CourseMaterialService,
    private topicService: TopicService,
    private lessonService: LessonService,
    private examService: ExamService,
    private assignmentService: AssignmentService,
    private assignmentSolutionService: AssignmentSolutionService,
    private examSolutionService: ExamSolutionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (sessionStorage.getItem('token')) {
      const encryptedEmail = sessionStorage.getItem('token');
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail!.toString(),
        environment.jwtSecret
      ).toString(CryptoJS.enc.Utf8);
      this.email = decryptedEmail;
      this.courseService.getCourse(this.courseId).subscribe((data) => {
        this.course = data;
      });
      this.courseMaterialService
        .getCourseMaterial(this.courseId)
        .subscribe((data) => {
          this.courseMaterials = data;
        });
    }
  }
  changeRoute(route: string) {
    this.router.navigate([route]);
  }
  toogleSideBar() {
    this.showSideBar = !this.showSideBar;
  }
  toogleSideBarItems(position: Number, topic?: Topic, exam?: Exam) {
    if (position == 1) {
      //show course materials
      this.showTopic = false;
      this.showLesson = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showAssignmentSolution = false;
      this.showExamSolution = false;
      this.showCourseMaterial = !this.showCourseMaterial;
      this.courseMaterialService
        .getCourseMaterial(this.courseId)
        .subscribe((data) => {
          this.courseMaterials = data;
        });
    } else if (position == 2) {
      //show topics
      this.showCourseMaterial = false;
      this.showLesson = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showAssignmentSolution = false;
      this.showExamSolution = false;
      this.showTopic = !this.showTopic;
      this.topicService.getTopics(this.courseId).subscribe((data) => {
        this.topics = data;
      });
    } else if (position == 3) {
      //show lessons
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showAssignmentSolution = false;
      this.showExamSolution = false;
      this.showLesson = true;
      this.topicId = topic?.topicId;
      this.topicTitle = topic?.topicTitle;
      this.topicDescription = topic?.topicDescription;
      this.lessonService.getLessons(topic?.topicId).subscribe((data) => {
        this.lessons = data;
      });
    } else if (position == 4) {
      //show exams
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showLesson = false;
      this.showAssignment = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showAssignmentSolution = false;
      this.showExamSolution = false;
      this.showExam = !this.showExam;
      this.examService.getExams(this.courseId).subscribe((data) => {
        this.examQuestions = data;
      });
    } else if (position == 5) {
      //show assignments
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showLesson = false;
      this.showExam = false;
      this.showQuestion = false;
      this.showVideo = false;
      this.showAssignmentSolution = false;
      this.showExamSolution = false;
      this.showAssignment = !this.showAssignment;
      this.assignmentService.getAssignments(this.courseId).subscribe((data) => {
        this.assignments = data;
      });
    } else if (position == 6) {
      //show questions of the exam
      this.showCourseMaterial = false;
      this.showTopic = false;
      this.showLesson = false;
      this.showExam = false;
      this.showAssignment = false;
      this.showVideo = false;
      this.showAssignmentSolution = false;
      this.showExamSolution = false;
      this.showQuestion = true;
      this.examId = exam!.examId;
      this.examActiveStatus = exam!.active;
    }
  }
  activateVideo(videoId: string) {
    this.showCourseMaterial = false;
    this.showTopic = false;
    this.showLesson = false;
    this.showExam = false;
    this.showAssignment = false;
    this.showQuestion = false;
    this.showVideo = true;
    this.videoId = videoId;
  }
  downloadFile(id: string, fileName: string) {
    this.courseMaterialService.downloadFile(id).subscribe((data: Blob) => {
      const downloadUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
    });
  }
  bytesToMegabytes(bytes: number, decimalPlaces: number): number {
    const megabytes = bytes / (1024 * 1024);
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(megabytes * factor) / factor;
  }
  formatDate(dateString: string): string {
    const dateTimeParts = dateString.split('T');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-indexed
    const day = parseInt(dateParts[2]);
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    const date = new Date(year, month, day, hours, minutes);
    const monthName = date.toLocaleString('default', { month: 'short' });
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for display
    const timeSuffix = hours < 12 ? 'am' : 'pm'; // Determine time suffix
    const formattedDate = `${monthName} ${date.getDate()} ${date.getFullYear()} @ ${formattedHours}:${this.formatMinutes(
      date.getMinutes()
    )} ${timeSuffix}`;

    return formattedDate;
  }
  formatMinutes(minutes: number): string {
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes.toString();
  }
  expand(exam: Exam) {
    exam.expanded = !exam.expanded;
  }
  showSnackbarAction(content: string, action: string | undefined) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {});
    snack.onAction().subscribe(() => {});
  }
  //coursematerial functions
  uploadCourseMaterial() {
    const data: FormData = {
      title: 'Upload Course Material Form',
      courseId: this.courseId,
      type: 0,
      fileIncluded: true,
      positiveButton: 'Upload',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseMaterialService.postCourseMaterial(result).subscribe(
          (result) => {
            this.showSnackbarAction('course material successfully added', 'OK');
            this.courseMaterialService
              .getCourseMaterial(this.courseId)
              .subscribe((data) => {
                this.courseMaterials = data;
              });
          },
          (error) => {
            this.showSnackbarAction(error, 'OK');
          }
        );
      } else {
        return;
      }
    });
  }
  deleteCourseMaterial(courseMaterial: CourseMaterial) {
    const data: PopupData = {
      title: 'Delete Course Material',
      content: ['Are you sure to delete the course material'],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseMaterialService
          .deleteCourseMaterial(courseMaterial.courseMaterialId!)
          .subscribe(() => {
            this.courseMaterialService
              .getCourseMaterial(this.courseId)
              .subscribe((data) => {
                this.courseMaterials = data;
              });
          });
        this.showSnackbarAction('course material is deleted', 'OK');
      } else {
        return;
      }
    });
  }
  //topic functions
  addTopic() {
    const topic = new Topic();
    topic.courseId = this.courseId;
    topic.topicTitle = this.topic_title!;
    topic.topicDescription = this.topic_description!;
    this.topicService.addTopic(topic).subscribe(() => {
      this.topicService.getTopics(this.courseId).subscribe((data) => {
        this.topics = data;
      });
    });
    this.topic_title = '';
    this.topic_description = '';
  }

  newTitle?: string;
  editedTopicForTitle?: string;

  editTopicName() {
    this.topicService
      .editTopicName(this.newTitle!, this.editedTopicForTitle!)
      .subscribe(() => {
        this.topicService.getTopics(this.courseId).subscribe((data) => {
          this.topics = data;
        });
      });
    this.newTitle = '';
  }

  newDescription?: string;
  editedTopicForDescription?: string;

  editTopicDescription() {
    this.topicService
      .editTopicDescription(
        this.newDescription!,
        this.editedTopicForDescription!
      )
      .subscribe(() => {
        this.topicService.getTopics(this.courseId).subscribe((data) => {
          this.topics = data;
        });
      });
    this.newDescription = '';
  }
  deleteTopic(topicId: string) {
    const data: PopupData = {
      title: 'Delete Topic',
      content: [
        'Are you sure to delete the topic',
        '*deleting a topic will automatically delete all lessons inside it',
      ],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.topicService.deleteTopic(topicId).subscribe(() => {
          this.topicService.getTopics(this.courseId).subscribe((data) => {
            this.topics = data;
          });
        });
        this.showSnackbarAction('topic deleted', 'OK');
      } else {
        return;
      }
    });
  }
  //lesson functions
  addLesson(topicId: string) {
    const data: FormData = {
      title: 'Add lesson',
      courseId: topicId,
      type: 2,
      fileIncluded: false,
      positiveButton: 'add',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lessonService.addLesson(result).subscribe(
          (result) => {
            this.showSnackbarAction('lesson successfully added', 'OK');
            this.lessonService.getLessons(topicId).subscribe((data) => {
              this.lessons = data;
            });
          },
          (error) => {
            this.showSnackbarAction(error, 'OK');
          }
        );
      } else {
        return;
      }
    });
  }
  deleteLesson(lessonId: string) {
    const data: PopupData = {
      title: 'Delete Lesson',
      content: ['Are you sure to delete lesson'],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lessonService.deleteLesson(lessonId).subscribe(() => {
          this.lessonService.getLessons(this.topicId).subscribe((data) => {
            this.lessons = data;
          });
        });
        this.showSnackbarAction('lesson is deleted', 'OK');
      } else {
        return;
      }
    });
  }
  //exam functions
  addExam() {
    const data: FormData = {
      title: 'Add Exam',
      courseId: this.courseId,
      type: 3,
      fileIncluded: false,
      positiveButton: 'add',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.examService.addExam(result).subscribe(
          (result) => {
            this.examService.getExams(this.courseId).subscribe((data) => {
              this.examQuestions = data;
            });
            this.showSnackbarAction(result.message, 'OK');
          },
          (error) => {
            this.showSnackbarAction(
              'unable to add exam for the specified date',
              'OK'
            );
          }
        );
      } else {
        return;
      }
    });
  }
  deleteExam(examId: string) {
    const data: PopupData = {
      title: 'Delete Exam',
      content: ['Are you sure to delete exam'],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.examService.deleteExam(examId).subscribe(() => {
          this.examService.getExams(this.courseId).subscribe((data) => {
            this.examQuestions = data;
          });
        });
        this.showSnackbarAction('exam is deleted', 'OK');
      } else {
        return;
      }
    });
  }
  displayAnswer(examId: string) {
    const data: FormData = {
      title: 'choose Student',
      type: 4,
      courseId: this.courseId,
      fileIncluded: false,
      positiveButton: 'submit',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.examSolutionService
          .getExamSolution(result, examId)
          .subscribe((solution) => {
            this.showExam = false;
            this.showExamSolution = true;
            this.examSolution = solution;
          });
      } else {
        return;
      }
    });
  }
  //assignment functions
  addAssignment() {
    const data: FormData = {
      title: 'Upload Assignment Form',
      courseId: this.courseId,
      type: 1,
      fileIncluded: true,
      positiveButton: 'Upload',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignmentService.postAssignment(result).subscribe(
          (result) => {
            this.assignmentService
              .getAssignments(this.courseId)
              .subscribe((data) => {
                this.assignments = data;
              });
            this.showSnackbarAction('assignment successfully added', 'OK');
          },
          (error) => {
            this.assignmentService
              .getAssignments(this.courseId)
              .subscribe((data) => {
                this.assignments = data;
              });
            this.showSnackbarAction('unable to add new assignment', 'OK');
          }
        );
      } else {
        return;
      }
    });
  }
  deleteAssignment(assignmentId: string) {
    const data: PopupData = {
      title: 'Delete Assignment',
      content: ['Are you sure to delete the assignment'],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignmentService
          .deleteAssignment(assignmentId)
          .subscribe((result) => {
            this.showSnackbarAction('assignment is deleted', 'OK');
            this.assignmentService
              .getAssignments(this.courseId)
              .subscribe((data) => {
                this.assignments = data;
              });
          });
      } else {
        return;
      }
    });
  }
  //assignment solution
  displayAssignmentSolution(assignmentId: string) {
    this.assignmentSolution = undefined;
    const data: FormData = {
      title: 'choose Student',
      type: 4,
      courseId: this.courseId,
      fileIncluded: false,
      positiveButton: 'submit',
      negativeButton: 'Cancel',
    };
    const dialogRef = this.dialog.open(FormComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignmentSolutionService
          .getAssignmentSolutionById(assignmentId)
          .subscribe((solutions) => {
            solutions.forEach((solution) => {
              if (solution.uploader == result) {
                this.showAssignment = false;
                this.showAssignmentSolution = true;
                this.assignmentSolution = solution;
              }
            });
            if (!this.assignmentSolution)
              this.showSnackbarAction(
                'this student have not submitted any solution yet',
                'OK'
              );
          });
      } else {
        this.showSnackbarAction(
          'this student have not submitted any solution yet',
          'OK'
        );
        return;
      }
    });
  }
}
