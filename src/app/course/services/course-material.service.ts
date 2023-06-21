import { Injectable } from '@angular/core';
import { DataService } from '../../service/DataService';
import { CourseMaterial } from '../../models/course-material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseMaterialService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.courseMaterialApiUrl;
  }

  getCourseMaterial(id: string): Observable<CourseMaterial> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
  postCourseMaterial(courseMaterial: CourseMaterial): Observable<FormData> {
    const formData = new FormData();
    formData.append('file', courseMaterial.file!, courseMaterial.file!.name);
    formData.append('uploader', courseMaterial.courseMaterialUploader!);
    formData.append('description', courseMaterial.courseMaterialDescription!);
    formData.append('course_id', courseMaterial.courseId!);
    const url = `${this.getUrl()}`;
    return this.add(url, formData);
  }
  deleteCourseMaterial(id: string): Observable<any> {
    const url = `${this.getUrl()}/delete`;
    return this.delete(url, id);
  }
}
