import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDemandePublieComponent } from './display-demande-publie.component';

describe('DisplayDemandePublieComponent', () => {
  let component: DisplayDemandePublieComponent;
  let fixture: ComponentFixture<DisplayDemandePublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDemandePublieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDemandePublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
