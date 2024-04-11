import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienRhCollabComponent } from './entretien-rh-collab.component';

describe('EntretienRhCollabComponent', () => {
  let component: EntretienRhCollabComponent;
  let fixture: ComponentFixture<EntretienRhCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienRhCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntretienRhCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
