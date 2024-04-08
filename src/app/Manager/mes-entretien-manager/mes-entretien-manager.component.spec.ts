import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEntretienManagerComponent } from './mes-entretien-manager.component';

describe('MesEntretienManagerComponent', () => {
  let component: MesEntretienManagerComponent;
  let fixture: ComponentFixture<MesEntretienManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEntretienManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEntretienManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
