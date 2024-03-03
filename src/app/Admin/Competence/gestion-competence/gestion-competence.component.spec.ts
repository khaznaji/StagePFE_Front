import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCompetenceComponent } from './gestion-competence.component';

describe('GestionCompetenceComponent', () => {
  let component: GestionCompetenceComponent;
  let fixture: ComponentFixture<GestionCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
