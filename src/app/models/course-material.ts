export class CourseMaterial {
  file?: File;
  courseMaterialId?: string;
  courseMaterialName?: string;
  courseMaterialSize?: number;
  courseMaterialDescription?: string;
  courseMaterialUploader?: string;
  courseId?: string;

  constructor(
    file: File,
    uploader: string,
    description: string,
    courseId: string
  ) {
    this.file = file;
    this.courseMaterialUploader = uploader;
    this.courseMaterialDescription = description;
    this.courseId = courseId;
  }
}
