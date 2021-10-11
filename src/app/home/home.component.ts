import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  errMsg!: string;
  promotion!: Promotion;
  leader!: Leader;

  constructor(
    private dishService: DishService,
    private leaderService: LeaderService,
    private promotionService: PromotionService,
    @Inject('BaseURL') public BaseURL: string
  ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errMsg => this.errMsg = errMsg);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
  }

}
