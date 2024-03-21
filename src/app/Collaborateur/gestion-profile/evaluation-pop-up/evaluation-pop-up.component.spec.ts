import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPopUpComponent } from './evaluation-pop-up.component';

describe('EvaluationPopUpComponent', () => {
  let component: EvaluationPopUpComponent;
  let fixture: ComponentFixture<EvaluationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
