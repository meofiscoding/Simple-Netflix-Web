import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  public getData = (route: string, query?: any) => {
    return this.http.get(this.createCompleteRoute(route, Constants.apiRoot), query);
  }

  public postData = (route: string, data: any) => {
    return this.http.post(this.createCompleteRoute(route, Constants.apiRoot), data);
  };

  public createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
