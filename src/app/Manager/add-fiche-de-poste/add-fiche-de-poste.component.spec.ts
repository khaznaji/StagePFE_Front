import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFicheDePosteComponent } from './add-fiche-de-poste.component';

describe('AddFicheDePosteComponent', () => {
  let component: AddFicheDePosteComponent;
  let fixture: ComponentFixture<AddFicheDePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFicheDePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFicheDePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
