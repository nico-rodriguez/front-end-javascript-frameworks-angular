import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavoritesComponent implements OnInit {

  favorites!: Favorite | null;
  delete!: boolean;
  errMess!: string;

  constructor(
    private favoriteService: FavoriteService,
    @Inject('BaseURL') public BaseURL: string
  ) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        (errmess: string) => this.errMess = errmess);
  }

  deleteFavorite(id: string) {
    console.log('Deleting Dish ' + id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.favorites = <Favorite>favorites,
        (errmess: string) => this.errMess = errmess);
    this.delete = false;
  }

}