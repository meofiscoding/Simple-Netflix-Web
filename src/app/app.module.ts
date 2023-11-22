import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwplayerComponent } from './jwplayer/jwplayer.component';
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
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment.development';
import { MoviePlayerComponent } from './movie/movie-player/movie-player.component';

@NgModule({
  declarations: [
    AppComponent,
    JwplayerComponent,
    MenuComponent,
    HomeComponent,
    ErrorPagesComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    MoviePlayerComponent
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
      { path: 'movies', loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule) },
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
