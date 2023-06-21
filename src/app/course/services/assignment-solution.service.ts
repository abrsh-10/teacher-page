import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { DataService } from 'src/app/service/DataService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentSolutionService extends DataService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return environment.assignmentSolutionApiUrl;
  }
  getAssignmentSolutionById(id: string): Observable<any[]> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
  deleteAssignmentSolution(id: string): Observable<any> {
    const url = `${this.getUrl()}/delete`;
    return this.delete(url, id);
  }
}
