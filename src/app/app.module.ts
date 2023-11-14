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
import { GetPricingPlanComponent } from './get-pricing-plan/get-pricing-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from './shared/services/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ErrorPagesComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    GetPricingPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'error', component: ErrorPagesComponent },
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
      { path: 'planform', component: GetPricingPlanComponent },
      { path: '404', component: ErrorPagesComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full' },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
