import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './success/success.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'success', component: SuccessComponent }
    ])
  ]
})
export class SubscriptionModule { }
