import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBilanComponent } from './bilan.component';

describe('BilanComponent', () => {
  let component: MesBilanComponent;
  let fixture: ComponentFixture<MesBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesBilanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
