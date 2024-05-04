import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSessionsFormateurComponent } from './mes-sessions-formateur.component';

describe('MesSessionsFormateurComponent', () => {
  let component: MesSessionsFormateurComponent;
  let fixture: ComponentFixture<MesSessionsFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesSessionsFormateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesSessionsFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
