import { Component } from '@angular/core';
import { ApiserviceService } from '../../shared/services/apiservice.service';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Constants } from '../../shared/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserPricingPlanDTO } from 'src/app/_interface/payment/userPricingPlanDto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-pricing-plan',
  templateUrl: './get-pricing-plan.component.html',
  styleUrls: ['./get-pricing-plan.component.css']
})

export class GetPricingPlanComponent {
  private stripePromise?: Promise<Stripe | null>;
  constructor(private apiService: ApiserviceService, private authService: AuthService, private _router: Router) { }

  pricingPlansList: any = [];
  selectedTabIndex: number = 0; // Initialize with the default selected tab index
  currentUserId: string = "";

  selectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  ngOnInit() {
    this.getPricingPlans();
    this.authService.getCurrentUserId().then((userId: string) => {
      this.currentUserId = userId;
    });
  }

  getPricingPlans() {
    this.apiService.getData(Constants.pricingPlansApi).subscribe((data: any) => {
      this.pricingPlansList = data;
      this.selectedTabIndex = this.pricingPlansList[0].id;
    });
  }

  //   async redirectToPayment() {
  //     const navigationExtras: NavigationExtras = {
  //       state: {
  //         planId: this.selectedTabIndex
  //       }
  //     };

  //     this._router.navigate(['/payment/checkout'], navigationExtras);
  //   // await this.pay(environment.stripe.publicKey);
  //   // this.apiService.postSubcription(subcriptionID).subscribe((data: any) => {
  //   //   console.log(data);
  //   // });
  // }

  async pay(stripePublicKey: string) {
    this.stripePromise = loadStripe(stripePublicKey);
    const stripe = await this.stripePromise;
    const userPayment: UserPricingPlanDTO = {
      userId: this.currentUserId,
      pricingPlanId: this.selectedTabIndex
    }
    this.apiService.postData(Constants.subscriptionApi, userPayment).subscribe((response: any) => {
      stripe?.redirectToCheckout({ sessionId: response }).then((result: any) => {
        debugger;
        console.log(result);
      })
    });
  }
}
