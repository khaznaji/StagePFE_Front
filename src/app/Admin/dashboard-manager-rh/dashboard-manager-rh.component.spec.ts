import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardManagerRhComponent } from './dashboard-manager-rh.component';

describe('DashboardManagerRhComponent', () => {
  let component: DashboardManagerRhComponent;
  let fixture: ComponentFixture<DashboardManagerRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardManagerRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardManagerRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
