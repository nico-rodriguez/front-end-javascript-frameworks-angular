import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: string): Dish | undefined {
    return DISHES.find(dish => dish.id === id);
  }

  getFeaturedDish(): Dish | undefined {
    return DISHES.find(dish => dish.featured);
  }
}
