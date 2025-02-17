import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSideBarComponent } from './super-admin-side-bar.component';

describe('SuperAdminSideBarComponent', () => {
  let component: SuperAdminSideBarComponent;
  let fixture: ComponentFixture<SuperAdminSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperAdminSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
