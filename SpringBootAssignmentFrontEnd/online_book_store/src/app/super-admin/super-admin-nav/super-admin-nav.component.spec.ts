import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminNavComponent } from './super-admin-nav.component';

describe('SuperAdminNavComponent', () => {
  let component: SuperAdminNavComponent;
  let fixture: ComponentFixture<SuperAdminNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperAdminNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
