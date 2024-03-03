import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompteCollabComponent } from './add-compte-collab.component';

describe('AddCompteCollabComponent', () => {
  let component: AddCompteCollabComponent;
  let fixture: ComponentFixture<AddCompteCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompteCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompteCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
