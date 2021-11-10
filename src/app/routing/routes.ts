import { Routes } from "@angular/router";

import { AboutComponent } from '../about/about.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { ContactComponent } from '../contact/contact.component';
import { DishDetailComponent } from '../dishdetail/dishdetail.component';
import { FavoritesComponent } from "../favorites/favorites.component";
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'aboutus', component: AboutComponent},
  {path: 'contactus', component: ContactComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'dishdetail/:id', component: DishDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];