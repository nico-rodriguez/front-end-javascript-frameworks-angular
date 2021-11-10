import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { baseURL } from '../shared/config';
import { Promotion } from '../shared/promotion';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService
  ) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + '/promotions')
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + `/promotions/${id}`)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + '/promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
