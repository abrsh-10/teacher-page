import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Exam } from '../../models/exam';
import { Observable } from 'rxjs';
import { Question } from '../../models/question';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.examApiUrl;
  }
  getExams(id: string): Observable<Exam> {
    const url = `${this.getUrl()}/course-id`;
    return this.getById(url, id);
  }
  addExam(exam: Exam): Observable<any> {
    const url = `${this.getUrl()}`;
    return this.add(url, exam);
  }
  getQuestions(id: String): Observable<Question> {
    const url = `${this.getUrl()}/questions-teacher`;
    return this.getById(url, id);
  }
  addQuestions(id: string, question: any): Observable<Question> {
    const url = `${this.getUrl()}/add-questions`;
    return this.update(url, id, question);
  }
  removeQuestions(id: string, questionType: string, questionNumber: number) {
    const url = `${this.getUrl()}/remove-question`;
    const formData = new FormData();
    formData.append('questionType', questionType);
    formData.append('questionNumber', questionNumber.toString());
    return this.update(url, id, formData);
  }
  deleteExam(id: string): Observable<Exam> {
    const url = `${this.getUrl()}/delete`;
    return this.delete(url, id);
  }
}
