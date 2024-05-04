import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEntretienAnnuelManagerComponent } from './mes-entretien-annuel-manager.component';

describe('MesEntretienAnnuelManagerComponent', () => {
  let component: MesEntretienAnnuelManagerComponent;
  let fixture: ComponentFixture<MesEntretienAnnuelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEntretienAnnuelManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEntretienAnnuelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
