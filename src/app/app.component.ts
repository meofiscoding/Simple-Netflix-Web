import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(
  //   public oidcSecurityService: OidcSecurityService,
  //   private http: HttpClient
  // ) {
  // }
  constructor(private _authService: AuthService){
    this._authService.loginChanged.subscribe(userAuthenticated =>{
      this.isAuthenticated = userAuthenticated;
    })
  }
  title = 'Simple Netflix';
  public isAuthenticated: boolean = false;

  ngOnInit() {
    this._authService.isAuthenticated().then(authenticated =>{
      this.isAuthenticated = authenticated;
    })
  }
}
