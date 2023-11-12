import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';
import { RouterModule } from '@angular/router';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { PaymentComponent } from './payment/payment.component';
import { GetPricingPlanComponent } from './payment/get-pricing-plan/get-pricing-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ErrorPagesComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    PaymentComponent,
    GetPricingPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'error', component: ErrorPagesComponent},
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
      { path: '404', component : ErrorPagesComponent},
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
    
    // AuthModule.forRoot({
    //   config: {
    //     authority: 'https://frontend.20.211.61.204.nip.io',
    //     // authority: 'http://localhost:5002',
    //     redirectUrl: window.location.origin,
    //     postLogoutRedirectUri: window.location.origin,
    //     clientId: 'angular',
    //     scope: 'openid movies',
    //     responseType: 'code',
    //     logLevel: LogLevel.Debug,
    //   },
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
