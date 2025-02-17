import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRevenueComponent } from './seller-revenue.component';

describe('SellerRevenueComponent', () => {
  let component: SellerRevenueComponent;
  let fixture: ComponentFixture<SellerRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerRevenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
