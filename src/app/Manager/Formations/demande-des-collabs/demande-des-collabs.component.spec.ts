import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDesCollabsComponent } from './demande-des-collabs.component';

describe('DemandeDesCollabsComponent', () => {
  let component: DemandeDesCollabsComponent;
  let fixture: ComponentFixture<DemandeDesCollabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeDesCollabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDesCollabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
