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
} 

