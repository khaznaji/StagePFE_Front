import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormateurComponent } from './profile-formateur.component';

describe('ProfileFormateurComponent', () => {
  let component: ProfileFormateurComponent;
  let fixture: ComponentFixture<ProfileFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFormateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
