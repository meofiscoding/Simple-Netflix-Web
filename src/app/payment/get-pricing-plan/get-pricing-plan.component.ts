import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-get-pricing-plan',
  templateUrl: './get-pricing-plan.component.html',
  styleUrls: ['./get-pricing-plan.component.css']
})

export class GetPricingPlanComponent {
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
    });
  }
}
