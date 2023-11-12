import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-get-pricing-plan',
  templateUrl: './get-pricing-plan.component.html',
  styleUrls: ['./get-pricing-plan.component.css']
})

export class GetPricingPlanComponent {
  private stripePromise?: Promise<Stripe | null>;
  constructor(private apiService: ApiserviceService) { }

  pricingPlansList: any = [];

  selectedTabIndex: number = 0; // Initialize with the default selected tab index

  selectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  ngOnInit() {
    this.apiService.getPricingPlans().subscribe((data: any) => {
      console.log(data);
      this.pricingPlansList = data;
      // set selected tab index to the id of the first pricing plan
      this.selectedTabIndex = this.pricingPlansList[0].id;
    });
  }

  async redirectToPayment(subcriptionID: number) {
    console.log(subcriptionID);
    await this.pay(environment.stripe.publicKey);
    // this.apiService.postSubcription(subcriptionID).subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  async pay(stripePublicKey: string) {
    this.stripePromise = loadStripe(stripePublicKey);
    const stripe = await this.stripePromise;
    this.apiService.postSubcription(this.selectedTabIndex).subscribe((response: string) => {            
      stripe?.redirectToCheckout({ sessionId: response });
    });
  }
}
