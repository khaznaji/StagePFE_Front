import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompteFormateurComponent } from './add-compte-formateur.component';

describe('AddCompteFormateurComponent', () => {
  let component: AddCompteFormateurComponent;
  let fixture: ComponentFixture<AddCompteFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompteFormateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompteFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
