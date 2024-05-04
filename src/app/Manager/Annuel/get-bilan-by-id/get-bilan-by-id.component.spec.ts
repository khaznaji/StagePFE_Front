import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBilanByIdComponent } from './get-bilan-by-id.component';

describe('GetBilanByIdComponent', () => {
  let component: GetBilanByIdComponent;
  let fixture: ComponentFixture<GetBilanByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBilanByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetBilanByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
