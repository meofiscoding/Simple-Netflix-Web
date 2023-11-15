import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Appearance, PaymentIntent, StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };

  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
    this.createPaymentIntent(this.paymentElementForm.get('amount')?.value ?? 0)
      .subscribe(pi => {
        if (!pi.client_secret) {
          throw new Error('Invalid PaymentIntent client_secret');
        }
        this.elementsOptions.clientSecret = pi.client_secret;
      });
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(`${Constants.apiRoot}/create-payment-intent`, amount)
      .pipe(map(pi => this.camelToSnakeCase(pi)));
  }

  private camelToSnakeCase(obj: any) {
    const snakeCaseObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        snakeCaseObj[snakeCaseKey] = obj[key];
      }
    }
    return snakeCaseObj;
  }

  changePlan() {

  }
  
  pay() {

  }
}
