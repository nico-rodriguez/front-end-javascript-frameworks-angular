import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish!: Dish;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const dishId = this.route.snapshot.params['id'];
    this.dish = <Dish>this.dishService.getDish(dishId);
  }

  goBack(): void {
    this.location.back();
  }

}
