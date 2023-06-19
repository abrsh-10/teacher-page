import { Injectable } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Topic } from '../../models/topic';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicService extends DataService<Topic> {
  constructor(http: HttpClient) {
    super(http);
  }
  protected getUrl(): string {
    return environment.topicApiUrl;
  }
  getTopics(id: String): Observable<Topic> {
    const url = `${this.getUrl()}/id`;
    return this.getById(url, id);
  }
  addTopic(topic: Topic): Observable<Topic> {
    const url = `${this.getUrl()}`;
    return this.add(url, topic);
  }
  editTopicName(topicName: string, id: string): Observable<Topic> {
    const url = `${this.getUrl()}/topic-title`;
    return this.update(url, id, topicName);
  }
  editTopicDescription(
    topicDescription: string,
    id: string
  ): Observable<Topic> {
    const url = `${this.getUrl()}/topic-description`;
    return this.update(url, id, topicDescription);
  }
}
