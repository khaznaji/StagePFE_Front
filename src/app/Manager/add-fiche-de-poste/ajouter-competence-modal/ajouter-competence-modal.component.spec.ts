import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCompetenceModalComponent } from './ajouter-competence-modal.component';

describe('AjouterCompetenceModalComponent', () => {
  let component: AjouterCompetenceModalComponent;
  let fixture: ComponentFixture<AjouterCompetenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCompetenceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCompetenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
