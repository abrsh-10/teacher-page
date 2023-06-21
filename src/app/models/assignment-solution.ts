export class AssignmentSolution {
  file!: File;
  assignmentSolutionId?: string;
  assignmentSolutionName?: string;
  assignmentSolutionSize?: number;
  uploader!: string;
  assignmentSolutionDescription?: string;
  assignmentId!: string;
  constructor(
    file: File,
    uploader: string,
    description: string,
    assignmentId: string
  ) {
    this.file = file;
    this.uploader = uploader;
    this.assignmentSolutionDescription = description;
    this.assignmentId = assignmentId;
  }
}
