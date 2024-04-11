import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateInterviewRhComponent } from './evaluate-interview-rh.component';

describe('EvaluateInterviewRhComponent', () => {
  let component: EvaluateInterviewRhComponent;
  let fixture: ComponentFixture<EvaluateInterviewRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateInterviewRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateInterviewRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
