import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetPricingPlanComponent} from './payment/get-pricing-plan/get-pricing-plan.component';

const routes: Routes = [
  { path: 'pricingPlans', component: GetPricingPlanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
