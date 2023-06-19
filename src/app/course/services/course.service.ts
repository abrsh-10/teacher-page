import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/DataService';
import { Course } from '../../models/course';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends DataService<Course> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.courseApiUrl;
  }
  getCourses(email: string): Observable<Course[]> {
    const url = `${this.getUrl()}/teacher`;
    return this.search(url, email);
  }
  getCourse(id: string): Observable<Course> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
}
