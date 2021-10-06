import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

import 'hammerjs';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DishDetailComponent } from './dishdetail/dishdetail.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    DishDetailComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    DishService,
    LeaderService,
    PromotionService
  ],
  // entryComponents: [
  //   LoginComponent
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
