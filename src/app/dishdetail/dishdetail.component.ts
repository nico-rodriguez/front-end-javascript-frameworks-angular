import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { visibility, flyInOut, expand } from '../animations/app.animations';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {

  dish!: Dish | null;
  errMsg!: string;
  dishIds!: string[];
  prev!: string;
  next!: string;

  comment!: Comment;
  commentForm!: FormGroup;
  visibility = 'shown';
  favorite: boolean = false;

  @ViewChild('cform') commentFormDirective: any;

  formErrors = {
    'comment': ''
  }

  validationMessages = {
    'comment': {
      'required': 'A comment is required'
    }
  }

  constructor(
    private dishService: DishService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: string
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(params['id']);
      }))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish._id);
        this.visibility = 'shown';
        this.favoriteService.isFavorite(this.dish._id)
          .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists; },
            err => console.log(err));
      },
        errMsg => this.errMsg = errMsg);
  }

  setPrevNext(dishId: string) {
    const dishIndex = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[((dishIndex - 1) + this.dishIds.length) % this.dishIds.length]
    this.next = this.dishIds[((dishIndex + 1) + this.dishIds.length) % this.dishIds.length]
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();  // (re)set form validation messages
  }

  onValueChanged(data?: any): void {
    if (!this.commentForm) return;

    const form = this.commentForm;
    const formErrors = this.formErrors;
    const validationMessages = this.validationMessages;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous message
        this.formErrors[field as keyof typeof formErrors] = '';

        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as keyof typeof validationMessages];
          for (const key in control.errors) {
            if (control.errors && control.errors.hasOwnProperty(key)) {
              this.formErrors[field as keyof typeof formErrors] += messages[key as keyof typeof messages] + ' ';
            }
          }
        }
      }      
    }
  }

  onSubmit(): void {
    this.dish && this.dishService.postComment(this.dish._id, this.commentForm.value)
      .subscribe(dish => this.dish = <Dish>dish);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
  }

  addToFavorites() {
    if (!this.favorite) {
      this.dish && this.favoriteService.postFavorite(this.dish._id)
        .subscribe(favorites => { console.log(favorites); this.favorite = true; });
    }
  }
}
