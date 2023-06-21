import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamSolution } from 'src/app/models/exam-solution';
import { DataService } from 'src/app/service/DataService';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamSolutionService extends DataService<ExamSolution> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.examSolutionApiUrl;
  }
  postExamSolution(examSolution: ExamSolution): Observable<ExamSolution> {
    const url = `${this.getUrl()}`;
    return this.add(url, examSolution);
  }
  getExamSolution(
    studentEmail: string,
    examId: string
  ): Observable<ExamSolution> {
    const url = `${this.getUrl()}/exam-student/${examId}?studentEmail=${studentEmail}`;
    return this.get(url);
  }
  markSeen(id: string): Observable<ExamSolution> {
    const url = `${this.getUrl()}/mark-seen`;
    return this.update(url, id, null);
  }
}
