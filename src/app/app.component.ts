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
    // this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
    //   console.log('isAuthenticated', isAuthenticated);
    //   if (!isAuthenticated.isAuthenticated) {
    //     // this.oidcSecurityService.authorize();
    //     console.log(isAuthenticated)
    //   }
    // });

    this._authService.isAuthenticated().then(authenticated =>{
      this.isAuthenticated = authenticated;
    })
  }

  // Showing all movies when user had payment success
  // callApi() {
  //   this.oidcSecurityService.getAccessToken().subscribe((token) => {
  //     console.log('token', token);
  //     this.http.get('https://frontend.20.211.61.204.nip.io/movies', {
  //       headers: { Authorization: `Bearer ${token}` },
  //       responseType: 'text',
  //     }).subscribe((data) => {
  //       console.log('data', data);
  //     }
  //     );
  //   });
  // }
}
