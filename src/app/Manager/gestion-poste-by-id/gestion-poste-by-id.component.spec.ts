import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPosteByIdComponent } from './gestion-poste-by-id.component';

describe('GestionPosteByIdComponent', () => {
  let component: GestionPosteByIdComponent;
  let fixture: ComponentFixture<GestionPosteByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPosteByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPosteByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
