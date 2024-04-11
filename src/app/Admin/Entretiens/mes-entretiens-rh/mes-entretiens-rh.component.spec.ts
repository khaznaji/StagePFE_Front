import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEntretiensRhComponent } from './mes-entretiens-rh.component';

describe('MesEntretiensRhComponent', () => {
  let component: MesEntretiensRhComponent;
  let fixture: ComponentFixture<MesEntretiensRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEntretiensRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEntretiensRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
