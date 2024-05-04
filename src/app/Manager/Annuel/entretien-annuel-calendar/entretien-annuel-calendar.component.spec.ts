import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienAnnuelCalendarComponent } from './entretien-annuel-calendar.component';

describe('EntretienAnnuelCalendarComponent', () => {
  let component: EntretienAnnuelCalendarComponent;
  let fixture: ComponentFixture<EntretienAnnuelCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienAnnuelCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntretienAnnuelCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
