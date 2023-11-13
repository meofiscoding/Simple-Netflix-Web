import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, from, lastValueFrom } from 'rxjs';
import { Constants } from '../constants';
import { EnvironmentUrlService } from './environment-url.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private _authService: AuthService) { }

  public getData = (route: string) => {
    return from(this._authService.getAccessToken().then(token => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const result = this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), { headers });
      return lastValueFrom(result);
    }));
  }

  public postData = (route: string, data: any) => {
    return from(this._authService.getAccessToken().then(token => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const result = this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), data, { headers });
      return lastValueFrom(result);
    }));
  };

  // postSubcription(subscription: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     })
  //   }
  //   return this.http.post(Constants.subscriptionApi, subscription, httpOptions);
  // }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}

