import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienRhComponent } from './entretien-rh.component';

describe('EntretienRhComponent', () => {
  let component: EntretienRhComponent;
  let fixture: ComponentFixture<EntretienRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntretienRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
