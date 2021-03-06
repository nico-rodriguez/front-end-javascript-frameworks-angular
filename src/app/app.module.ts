import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

import { baseURL } from './shared/config';
import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { PromotionService } from './services/promotion.service';
import { HighlightDirective } from './directives/highlight.directive';
import { FeedbackService } from './services/feedback.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthService } from './services/auth.service';
import { FavoriteService } from './services/favorite.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';

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
    LoginComponent,
    HighlightDirective,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'BaseURL', useValue: baseURL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    AuthService,
    DishService,
    FavoriteService,
    LeaderService,
    ProcessHTTPMsgService,
    PromotionService,
    FeedbackService
  ],
  // entryComponents: [
  //   LoginComponent
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
