export class Assignments {
  file?: File;
  assignmentName?: string;
  assignmentSize?: number;
  assignmentDescription?: string;
  assignmentUploader?: string;
  courseId?: string;

  constructor(
    file: File,
    uploader: string,
    description: string,
    courseId: string
  ) {
    this.file = file;
    this.assignmentUploader = uploader;
    this.assignmentDescription = description;
    this.courseId = courseId;
  }
}
