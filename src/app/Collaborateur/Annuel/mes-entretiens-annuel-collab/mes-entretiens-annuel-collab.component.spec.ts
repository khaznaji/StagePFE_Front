import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEntretiensAnnuelCollabComponent } from './mes-entretiens-annuel-collab.component';

describe('MesEntretiensAnnuelCollabComponent', () => {
  let component: MesEntretiensAnnuelCollabComponent;
  let fixture: ComponentFixture<MesEntretiensAnnuelCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEntretiensAnnuelCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEntretiensAnnuelCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
