import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationreussieComponent } from './activationreussie.component';

describe('ActivationreussieComponent', () => {
  let component: ActivationreussieComponent;
  let fixture: ComponentFixture<ActivationreussieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationreussieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationreussieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
