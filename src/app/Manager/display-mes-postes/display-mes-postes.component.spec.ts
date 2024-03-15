import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMesPostesComponent } from './display-mes-postes.component';

describe('DisplayMesPostesComponent', () => {
  let component: DisplayMesPostesComponent;
  let fixture: ComponentFixture<DisplayMesPostesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMesPostesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMesPostesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
