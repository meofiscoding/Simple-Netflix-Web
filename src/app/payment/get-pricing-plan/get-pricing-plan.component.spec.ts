import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPricingPlanComponent } from './get-pricing-plan.component';

describe('GetPricingPlanComponent', () => {
  let component: GetPricingPlanComponent;
  let fixture: ComponentFixture<GetPricingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPricingPlanComponent]
    });
    fixture = TestBed.createComponent(GetPricingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
