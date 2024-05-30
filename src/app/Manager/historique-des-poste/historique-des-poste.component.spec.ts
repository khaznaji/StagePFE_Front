import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDesPosteComponent } from './historique-des-poste.component';

describe('HistoriqueDesPosteComponent', () => {
  let component: HistoriqueDesPosteComponent;
  let fixture: ComponentFixture<HistoriqueDesPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueDesPosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueDesPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
