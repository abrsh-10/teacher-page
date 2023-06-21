import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Assignments } from '../../models/assignments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AssignmentService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.assignmentApiUrl;
  }
  getAssignments(id: String): Observable<Assignments> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
  postAssignment(assignment: Assignments): Observable<FormData> {
    const formData = new FormData();
    formData.append('file', assignment.file!, assignment.file!.name);
    formData.append('uploader', assignment.assignmentUploader!);
    formData.append('description', assignment.assignmentDescription!);
    formData.append('course_id', assignment.courseId!);
    const url = `${this.getUrl()}`;
    return this.add(url, formData);
  }
  deleteAssignment(id: string): Observable<any> {
    const url = `${this.getUrl()}/delete`;
    return this.delete(url, id);
  }
}
