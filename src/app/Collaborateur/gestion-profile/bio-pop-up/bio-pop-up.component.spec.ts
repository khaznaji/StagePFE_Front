import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioPopUpComponent } from './bio-pop-up.component';

describe('BioPopUpComponent', () => {
  let component: BioPopUpComponent;
  let fixture: ComponentFixture<BioPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
