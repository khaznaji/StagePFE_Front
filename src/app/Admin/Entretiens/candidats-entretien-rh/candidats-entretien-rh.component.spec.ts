import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsEntretienRhComponent } from './candidats-entretien-rh.component';

describe('CandidatsEntretienRhComponent', () => {
  let component: CandidatsEntretienRhComponent;
  let fixture: ComponentFixture<CandidatsEntretienRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatsEntretienRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatsEntretienRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
