import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../shared/config';
import { Feedback, FeedbackWithId } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService
  ) { }

  submitFeedback(feedback: Feedback): Observable<FeedbackWithId> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<FeedbackWithId>(baseURL + '/feedback', feedback, httpOptions)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
