import { Injectable } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/DataService';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LessonService extends DataService<Lesson> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.lessonApiUrl;
  }
  getLessons(id: any): Observable<Lesson> {
    const url = `${this.getUrl()}/topic-id`;
    return this.getById(url, id);
  }
  addLesson(lesson: Lesson): Observable<Lesson> {
    const url = `${this.getUrl()}`;
    return this.add(url, lesson);
  }
  deleteLesson(lessonId: string): Observable<Lesson> {
    const url = `${this.getUrl()}/lesson-id`;
    return this.delete(url, lessonId);
  }
}
