import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { RouterModule } from '@angular/router';
import { GetPricingPlanComponent } from './get-pricing-plan/get-pricing-plan.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    OrderCancelComponent,
    CheckoutComponent,
    GetPricingPlanComponent,
    CheckoutComponent
  ],
  imports: [
    NgxStripeModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'checkout', component: CheckoutComponent },
      { path: 'planform', component: GetPricingPlanComponent },
      { path: 'cancel', component: OrderCancelComponent }
    ])
  ]
})
export class PaymentModule { }
