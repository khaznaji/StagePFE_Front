import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBilanComponent } from './update-bilan.component';

describe('UpdateBilanComponent', () => {
  let component: UpdateBilanComponent;
  let fixture: ComponentFixture<UpdateBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBilanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
