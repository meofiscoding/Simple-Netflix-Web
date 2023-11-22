import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';
import { RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { MovieComponent } from './movie/movie.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment.development';
import { MovieCarouselComponent } from './movie/movie-carousel/movie-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ErrorPagesComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    MovieComponent,
    MovieCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'error', component: ErrorPagesComponent },
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
      { path: 'movies', component: MovieComponent },
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
      { path: '404', component: ErrorPagesComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full' },
    ]),
    NgxStripeModule.forRoot(environment.stripe.publicKey)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
