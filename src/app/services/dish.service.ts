import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES)
      // Simulate server latency
      .pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(<Dish>DISHES.find(dish => dish.id === id))
      // Simulate server latency
      .pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(<Dish>DISHES.find(dish => dish.featured))
      // Simulate server latency
      .pipe(delay(2000));
  }
}
