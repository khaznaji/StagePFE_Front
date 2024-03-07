import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserByIdComponent } from './user-by-id.component';

describe('UserByIdComponent', () => {
  let component: UserByIdComponent;
  let fixture: ComponentFixture<UserByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
