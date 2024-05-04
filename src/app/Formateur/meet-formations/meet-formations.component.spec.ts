import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetFormationsComponent } from './meet-formations.component';

describe('MeetFormationsComponent', () => {
  let component: MeetFormationsComponent;
  let fixture: ComponentFixture<MeetFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
