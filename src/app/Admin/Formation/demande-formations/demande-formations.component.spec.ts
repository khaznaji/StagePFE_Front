import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationsComponent } from './demande-formations.component';

describe('DemandeFormationsComponent', () => {
  let component: DemandeFormationsComponent;
  let fixture: ComponentFixture<DemandeFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
