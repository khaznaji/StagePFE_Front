import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEvaluateBilanComponent } from './pop-up-evaluate-bilan.component';

describe('PopUpEvaluateBilanComponent', () => {
  let component: PopUpEvaluateBilanComponent;
  let fixture: ComponentFixture<PopUpEvaluateBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpEvaluateBilanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpEvaluateBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
