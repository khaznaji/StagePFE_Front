import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessDialogComponent } from './signup-success-dialog.component';

describe('SignupSuccessDialogComponent', () => {
  let component: SignupSuccessDialogComponent;
  let fixture: ComponentFixture<SignupSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSuccessDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
