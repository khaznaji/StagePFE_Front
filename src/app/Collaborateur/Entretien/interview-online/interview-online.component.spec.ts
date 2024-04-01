import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewOnlineComponent } from './interview-online.component';

describe('InterviewOnlineComponent', () => {
  let component: InterviewOnlineComponent;
  let fixture: ComponentFixture<InterviewOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
