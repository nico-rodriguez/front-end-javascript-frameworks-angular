import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/config';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + '/dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + `/dishes/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + '/dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes: Dish[] | any) => dishes.map((dish: Dish) => dish._id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Dish>(baseURL + `/dishes/${dish._id}`, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postComment(dishId: string, comment: any) {
    return this.http.post(baseURL + '/dishes/' + dishId + '/comments', comment)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
