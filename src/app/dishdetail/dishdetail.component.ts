import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish!: Dish | null;
  errMsg!: string;
  dishIds!: string[];
  prev!: string;
  next!: string;

  comment!: Comment;
  commentForm!: FormGroup;
  dishCopy!: Dish | null;

  @ViewChild('cform') commentFormDirective: any;

  formErrors = {
    'author': '',
    'comment': ''
  }

  validationMessages = {
    'author': {
      'required': 'Author name is required',
      'minlength': 'Author name must be at least 2 characters long'
    },
    'comment': {
      'required': 'A comment is required'
    }
  }

  constructor(
    private dishService: DishService,
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
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNext(dish.id);
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
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ''
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
    this.comment = {...this.commentForm.value, date: new Date().toISOString()};
    console.log(this.comment);
    (<Dish>this.dishCopy).comments.push(this.comment);
    this.dishService.putDish(<Dish>this.dishCopy)
      .subscribe(dish => {
        this.dish = dish;
      }, errMsg => {
        this.errMsg = errMsg;
        this.dish = null;
        this.dishCopy = null;
      })
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

}
