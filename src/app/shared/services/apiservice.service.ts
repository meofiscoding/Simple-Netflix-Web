import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Constants } from '../constants';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  public getData = (route: string, options?: any): Observable<any> => {
    return this.http.get(this.createCompleteRoute(route, environment.apiRoot), options);
  }

  public postData = (route: string, data: any) => {
    let reqHeaders = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.createCompleteRoute(route, environment.apiRoot), data, {headers:reqHeaders});
  };

  public createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}

