import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsFormationsCollabComponent } from './sessions-formations-collab.component';

describe('SessionsFormationsCollabComponent', () => {
  let component: SessionsFormationsCollabComponent;
  let fixture: ComponentFixture<SessionsFormationsCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionsFormationsCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsFormationsCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
