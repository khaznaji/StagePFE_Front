import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateInterviewComponent } from './evaluate-interview.component';

describe('EvaluateInterviewComponent', () => {
  let component: EvaluateInterviewComponent;
  let fixture: ComponentFixture<EvaluateInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
