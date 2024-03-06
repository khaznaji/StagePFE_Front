import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcollabComponent } from './allcollab.component';

describe('AllcollabComponent', () => {
  let component: AllcollabComponent;
  let fixture: ComponentFixture<AllcollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
