import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS)
      // Simulate server latency
      .pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(<Promotion>PROMOTIONS.find(promo => promo.id === id))
      // Simulate server latency
      .pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(<Promotion>PROMOTIONS.find(promo => promo.featured))
      // Simulate server latency
      .pipe(delay(2000));
  }
}
