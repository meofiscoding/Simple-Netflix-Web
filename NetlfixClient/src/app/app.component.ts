import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public oidcSecurityService: OidcSecurityService,
    private http: HttpClient
  ) {
  }
  title = 'NetlfixClient';

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      console.log('isAuthenticated', isAuthenticated);
      if (!isAuthenticated) {
        this.oidcSecurityService.authorize();
      }
    });
  }

  // Showing all movies when user had payment success
  callApi() {
    this.oidcSecurityService.getAccessToken().subscribe((token) => {
      console.log('token', token);
      this.http.get('https://localhost:5000/movies', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'text',
      }).subscribe((data) => {
        console.log('data', data);
      }
      );
    });
  }
}
