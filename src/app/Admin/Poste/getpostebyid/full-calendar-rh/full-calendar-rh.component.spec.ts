import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalendarRhComponent } from './full-calendar-rh.component';

describe('FullCalendarRhComponent', () => {
  let component: FullCalendarRhComponent;
  let fixture: ComponentFixture<FullCalendarRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullCalendarRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCalendarRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
