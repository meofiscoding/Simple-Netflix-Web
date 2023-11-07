import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ErrorPagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://frontend.20.211.61.204.nip.io',
        // authority: 'http://localhost:5002',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular',
        scope: 'openid movies',
        responseType: 'code',
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
