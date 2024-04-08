import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEntretiensComponent } from './mes-entretiens.component';

describe('MesEntretiensComponent', () => {
  let component: MesEntretiensComponent;
  let fixture: ComponentFixture<MesEntretiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEntretiensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEntretiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
