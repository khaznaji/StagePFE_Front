import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MestesttechniqueComponent } from './mestesttechnique.component';

describe('MestesttechniqueComponent', () => {
  let component: MestesttechniqueComponent;
  let fixture: ComponentFixture<MestesttechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MestesttechniqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MestesttechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
