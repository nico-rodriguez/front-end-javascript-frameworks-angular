import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(
      resolve => {
        // Simulate server latency
        setTimeout(() => resolve(PROMOTIONS), 2000);
      }
    );
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise(
      resolve => {
        // Simulate server latency
        setTimeout(() => resolve(<Promotion>PROMOTIONS.find(promo => promo.id === id)), 2000);
      }
    );
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(
      resolve => {
        // Simulate server latency
        setTimeout(() => resolve(<Promotion>PROMOTIONS.find(promo => promo.featured)), 2000);
      }
    );
  }
}
