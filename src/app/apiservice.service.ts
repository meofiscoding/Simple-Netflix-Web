import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from './shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  // Pricing Plans
  getPricingPlans(): Observable<any> {
    return this.http.get(Constants.pricingPlansApi);
  }

  postSubcription(subscription: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(Constants.subscriptionApi, subscription, httpOptions);
  }
}

