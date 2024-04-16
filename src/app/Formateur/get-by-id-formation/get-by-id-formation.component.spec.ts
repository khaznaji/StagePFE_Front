import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdFormationComponent } from './get-by-id-formation.component';

describe('GetByIdFormationComponent', () => {
  let component: GetByIdFormationComponent;
  let fixture: ComponentFixture<GetByIdFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetByIdFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByIdFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
