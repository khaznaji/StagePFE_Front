import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardManagerServiceComponent } from './dashboard-manager-service.component';

describe('DashboardManagerServiceComponent', () => {
  let component: DashboardManagerServiceComponent;
  let fixture: ComponentFixture<DashboardManagerServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardManagerServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardManagerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
