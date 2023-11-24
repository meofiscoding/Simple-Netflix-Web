import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentIntent, StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, injectStripe } from 'ngx-stripe';
import { map, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Constants } from 'src/app/shared/constants';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/shared/services/apiservice.service';
import { SubscriptionCheckOutDto } from 'src/app/_interface/payment/subscriptionCheckOutDto.model';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
    locale: 'en',
  };
  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  stripe = injectStripe(environment.stripe.publicKey);
  paying = signal(false);
  
  paymentElementForm: FormGroup = this.fb.group({});
  userPricingPlan: SubscriptionCheckOutDto = {
    planType: "",
    price: 0,
  };
  planId: number = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _router: Router,
    private apiService: ApiserviceService
  ) { }

  ngOnInit() {
    // Retrieve data from the route
    this.planId = history.state.data;
    // fetch plan info
    this.apiService.getData(Constants.pricingPlansInfoApi + "/" + this.planId)
      .pipe(
        switchMap((data: any) => {
          this.userPricingPlan = data;
          return this.createPaymentIntent(this.userPricingPlan.price);
        })
      ).subscribe(pi => {
        if (!pi.client_secret) {
          throw new Error('Invalid PaymentIntent client_secret');
        }
        this.elementsOptions.clientSecret = pi.client_secret;
      });
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(`${environment.apiRoot}/${Constants.createPaymentIntentApi}`, this.userPricingPlan.price)
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

  pay(): void {
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);

    this.stripe.confirmPayment({
      elements: this.paymentElement.elements,
      confirmParams: {
      }, redirect: 'if_required'
    }).subscribe((result) => {
      this.paying.set(false);
      if (result.error) {
        alert({ success: false, error: result.error.message });
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // TODO: call api to update user's membership
          this.apiService.postData(Constants.paymentSuccessApi, this.planId).subscribe(
            // if status is 200, redirect to home page
            (data: any) => {
              // navigate to movies page
              this._router.navigate(['/movies']);
            },
          );
        }
      }
    });
  }
}
